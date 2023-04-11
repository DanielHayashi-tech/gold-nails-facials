// /api/specialtyStatus/[id].js
import { authMiddleware } from '@/lib/authMiddleware';
import prisma from '@/lib/prismaApp';

export default async function handler(req, res) {
    const employee_specialty_statusID = Number.parseInt(req.query.id);

    if (isNaN(employee_specialty_statusID)) {
        return res.status(400).json({ error: 'Invalid employee_specialty_statusID' });
    }

    if (req.method === 'GET') {
        authMiddleware(req, res, async () => {
            try {
                const specialtyStatus = await prisma.employee_Specialty_Status.findUnique({
                    where: { employee_specialty_statusID: employee_specialty_statusID },

                });

                if (!specialtyStatus) {
                    return res.status(404).json({ error: 'Specialty status not found', errorCode: 'SPECIALTY_STATUS_NOT_FOUND' });
                }

                return res.status(200).json({ data: specialtyStatus });
            } catch (error) {
                console.log(error);
                console.log(employee_specialty_statusID);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
