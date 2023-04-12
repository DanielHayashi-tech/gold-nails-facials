// /api/specialties.js
import prisma from '@/lib/prismaApp';
import { authMiddleware } from '@/lib/authMiddleware';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        authMiddleware(req, res, async () => {
            try {
                const specialties = await prisma.specialty.findMany({
                    select: {
                        SpecialtyID: true,
                        specialty_description: true,
                    },
                });

                return res.status(200).json({ data: specialties });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    } else {
        res.setHeader('Allow', 'GET');
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
