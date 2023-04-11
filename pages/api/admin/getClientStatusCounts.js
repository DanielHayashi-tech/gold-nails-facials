import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';

function filterClientsByTimeframe(clients, timeframe) {
  const now = new Date();
  return clients.filter((client) => {
    const registerDate = new Date(client.client_register_date);
    switch (timeframe) {
      case 'today':
        return registerDate.toDateString() === now.toDateString();
      case 'thisWeek':
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        return registerDate >= startOfWeek;
      case 'thisMonth':
        return registerDate.getMonth() === now.getMonth() && registerDate.getFullYear() === now.getFullYear();
      case 'thisYear':
        return registerDate.getFullYear() === now.getFullYear();
      default:
        return false;
    }
  });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await authMiddleware(req, res, async () => {
        const clients = await prisma.clients.findMany({
          select: {
            Client_statusID: true,
            client_register_date: true,
          },
        });

        const timeframes = ['today', 'thisWeek', 'thisMonth', 'thisYear'];
        const result = [];

        for (const timeframe of timeframes) {
          const filteredClients = filterClientsByTimeframe(clients, timeframe);
          const activeClients = filteredClients.filter(client => client.Client_statusID === 1).length;
          const inactiveClients = filteredClients.filter(client => client.Client_statusID === 2).length;
          result.push({ timeframe, activeClients, inactiveClients });
        }

        res.status(200).json(result);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
