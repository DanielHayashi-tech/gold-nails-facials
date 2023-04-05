import prisma from '@/lib/prismaApp';
import { authMiddleware } from '../../../lib/authMiddleware';
import { data } from 'autoprefixer';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    authMiddleware(req, res, async () => {
      //prsima here
      const services = req.body.data
      var total = 0.0
        //client posts what services are needed

      //get prices for services

      for(let x = 0; x < services.length; x++) {
          const ser = await prisma.service.findUnique({
            where: {
              ServiceID: services[x]
            }
          })
          total = total + ser.service_price
      }

        //create new order with clientid, total price and date
        console.log(total)
        const order = await prisma.service_Order.create({
          data: {
            ClientID: 1,
            service_order_quote: total,
            service_order_status_id: 2
          }
        })

        //create order service line for each of services with orderid and serviceid

        for(let x = 0; x < services.length; x++) {
          const order_line = await prisma.service_Order_Line.create({
            data: {
              service_order_line_statusID: 2,
              ServiceOrderID: order.ServiceOrderID,
              ServiceID: services[x]
            }
          })
        }
        res.status(200)
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 