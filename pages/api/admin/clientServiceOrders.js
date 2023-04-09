import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';


export default async function handle(req, res) {
    if (req.method === 'GET') {
        authMiddleware(req, res, async () => {
            const orders = await prisma.service_Order.findMany({});
            
            
            
            res.json({ orders });
        });
    
        //console.log(orders)

    } 
    
    else {
        res.status(405).json({ message: 'Method not allowed' });
    }

}
