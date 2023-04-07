import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';



export default async function handler(req, res) {
  console.log("eesfe")
  if (req.method === 'GET') {
    const type = req.query.type
    authMiddleware(req, res, async () => {
      //prsima here

        //prices for services
        console.log("eesfe")
      try {
        const item_prices = await prisma.clients.findMany()
        // console.log(item_prices)
        res.json(item_prices)
      } catch(error) {
        console.log(error)
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 