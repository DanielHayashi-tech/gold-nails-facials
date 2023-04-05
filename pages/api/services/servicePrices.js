import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';


export default async function handler(req, res) {
  if (req.method === 'GET') {
    authMiddleware(req, res, async () => {
      //prsima here

        //prices for services

        const data = await prisma.service.findMany()
        res.json(data)
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 