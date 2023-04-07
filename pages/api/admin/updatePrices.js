import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';

  
export default async function handler(req, res) {
    if (req.method === 'PUT') {
      authMiddleware(req, res, async () => {

        const { ServiceID, service_price } = req.body;

        console.log(req.query)
        console.log(ServiceID)
        console.log(service_price)


        console.log(typeof ServiceID, ServiceID);
        console.log(typeof service_price, service_price);
        try  {
          const servicePriceInfo = await prisma.service.update({
            where: {
              ServiceID: parseInt(ServiceID) ,
              
            },
            data: {service_price: parseInt(service_price) },
            
          });
  
          if (servicePriceInfo) {
            console.log(servicePriceInfo)
            return res.status(200).json({ success: true, data: servicePriceInfo });
            
          } else {
            return res.status(404).json({ success: false, message: 'Service not found' });
          }
        } catch (error) {
          console.log(error)
          return res.status(500).json({ success: false, error });
        }
      });
    } else {
        console.log(req.method)
      res.status(405).json({ message: 'Method not allowed' });
    }
  }



//              _
//          .__(.)< (MEOW)
//          \___)   
//      ~~~~~~~~~~~~~~~~~~