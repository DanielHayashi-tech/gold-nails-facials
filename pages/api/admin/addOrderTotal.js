import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';


export default async function handle(req, res) {
    if (req.method === 'GET') {
        authMiddleware(req, res, async () => {
            const total = await prisma.service_Order.count({});
            res.json({ total });
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

