import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';


export default async function handler(req, res) {
    if (req.method === "PUT") {
      try {
        await authMiddleware(req, res, async () => {
            const clients = await prisma.clients.findMany({
                include: {
                    service_orders: {
                        select: {
                            service_order_date: true,
                        },
                        orderBy: {
                            service_order_date: 'desc',
                        },
                        take: 1,
                    },
                },
            });


            const currentDate = new Date();
            const updatedClients = [];

            for (const client of clients) {
              if (client.service_orders && client.service_orders.length > 0) {
                const latestServiceOrderDate = new Date(client.service_orders[0].service_order_date);
                const daysDifference = Math.ceil((currentDate - latestServiceOrderDate) / (1000 * 60 * 60 * 24));

                if (daysDifference >= 60) {
                  const updatedClient = await prisma.clients.update({
                    where: { ClientID: client.ClientID },
                    data: { Client_statusID: 2 },
                  });
                    updatedClients.push(updatedClient);
                }
            }
            res.status(200).json(updatedClients);
          }
        });

      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }


  



//              _
//          .__(.)< (MEOW)
//          \___)   
//      ~~~~~~~~~~~~~~~~~~

