import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';


export default async function handle(req, res) {
  if (req.method === 'GET') {
    authMiddleware(req, res, async () => {
      try {
        const employeeSpecialties = await prisma.employee_Specialty.findMany();
        res.status(200).json(employeeSpecialties);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

