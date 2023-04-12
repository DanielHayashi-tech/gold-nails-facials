import prisma from 'lib/prismaApp';
import { authMiddleware } from '../../../lib/authMiddleware';


export default async function handler(req, res) {
  if (req.method === 'GET') {
        authMiddleware(req, res, async () => {
            const getOrders = await prisma.service_Order.findMany({
                where: {
                    service_order_status_id: 2
                },
                select: {
                    ServiceOrderID: true,
                    service_order_date: true,
                    service_order_quote: true,
                    service_order_status_id: true,
                    Clients: {
                        select: {
                            first_name: true,
                            last_name: true,
                            email_address: true
                        }
                    }
                  },
            })
              return res.status(200).json(getOrders)
        })
    }
}

//Admin
//orderID, Client Name, client email,list of serivces, order price, order status