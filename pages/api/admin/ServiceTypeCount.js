//pages/api/admin/getServiceOrderData.js

import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';

export default async function handle(req, res) {
  if (req.method === 'GET') {
    authMiddleware(req, res, async () => {
      try {
        const serviceTypeCounts = await prisma.service_Type.findMany({
          select: {
            service_typeID: true,
            service_type_description: true,
            Service: {
              select: { ServiceID: true },
            },
          },
        });

        const result = serviceTypeCounts.map(({ service_typeID, service_type_description, Service }) => ({
          service_typeID,
          service_type_description,
          count: Service.length,
        }));

        res.status(200).json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
