import prisma from 'lib/prismaApp';
import { authMiddleware } from '../../../lib/authMiddleware';


export default async function handler(req, res) {
  if (req.method === 'PUT') {
        // authMiddleware(req, res, async () => {
            const id = req.body.id
            const status = req.body.status
            await prisma.service_Order.update({
                where: {
                    ServiceOrderID: id
                },
                data: {
                    service_order_status_id: status
                }
            })
              return res.status(200).json(getOrders)
        // })
    }
}
