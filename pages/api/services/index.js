import prisma from '@/lib/prismaApp';
import { authMiddleware } from '../../../lib/authMiddleware';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    authMiddleware(req, res, async () => {
      //prsima here
      const services = req.body.data
      const total = 0.0
        //client posts what services are needed

      //get prices for services

      for(x in services) {
          const ser = await prisma.service.findUnique({
            where: {
              ServiceID: x
            }
          })
          total = total + ser['service_price']
      }

        //create new order with clientid, total price and date

        
        //create order service line for each of services with orderid and serviceid
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 