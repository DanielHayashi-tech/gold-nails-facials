import prisma from 'lib/prismaApp';
import { authMiddleware } from '../../../lib/authMiddleware';


export default async function handler(req, res) {
    if (req.method === 'PUT') {
      const { id, status } = req.body;
      console.log(id, status)
      try {
        await prisma.service_Order.update({
        where: {
          ServiceOrderID: id // Add the where clause here
        },
        data: {
          service_order_status_id: status
        }
      });
      return res.status(200).json({ message: "Updated" });
    }catch(error) {
        console.log(error)
    }
    }
  }
