// /api/admin/[id].js
import { authMiddleware } from '@/lib/authMiddleware';
import prisma from '@/lib/prismaApp';

export default async function handler(req, res) {
  const ServiceID = Number.parseInt(req.query.id);

  if (isNaN(ServiceID)) {
    return res.status(400).json({ error: 'Invalid ServiceID' });
  }

  if (req.method === 'GET') {
    authMiddleware(req, res, async () => {
      try {
        const service = await prisma.service.findUnique({
          where: { ServiceID: ServiceID },
        });

        if (!service) {
          return res.status(404).json({ error: 'Service not found', errorCode: 'SERVICE_NOT_FOUND' });
        }


        return res.status(200).json({ data: service });
      } catch (error) {
        console.log(error);
        console.log(ServiceID)
        return res.status(500).json({ error: 'Internal server error' });
      }
      
    });
  }
  else if (req.method === 'PUT') {
    authMiddleware(req, res, async () => {
      const { service_price } = req.body;

      try {
        const updatedService = await prisma.service.update({
          where: { ServiceID: ServiceID },
          data: {
            service_price: parseInt(service_price),
          },
        });
        return res.status(200).json({ success: true, data: updatedService });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error });
      }
    });
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

