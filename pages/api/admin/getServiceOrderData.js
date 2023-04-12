//pages/api/admin/getServiceOrderData.js
import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';

export default async function handler(req, res) {
  try {
    await authMiddleware(req, res, async () => {
      if (req.method === 'GET') {
        try {
            const data = await prisma.service_Order.findMany({
                select: {
                  ServiceOrderID: true,
                  ClientID: true,
                  service_order_quote: true,
                  service_order_date: true,
                  Clients: {
                    select: {
                      first_name: true,
                      last_name: true,
                      Client_statusID: true,
                    },
                  },
                },
              });

          res.status(200).json(data);
        } catch (error) {
          console.error('Error fetching data:', error); // Add this line
          res.status(500).json({ message: 'Error fetching data', error });
        }
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
    