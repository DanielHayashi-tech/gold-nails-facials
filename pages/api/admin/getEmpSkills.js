// pages/api/skillLevels.js
import { authMiddleware } from '../../../lib/authMiddleware';
import prisma from '@/lib/prismaApp';

export default async function skillLevels(req, res) {
  if (req.method === 'GET') {
    authMiddleware(req, res, async () => {
      try {
        const employeeSkillLevels = await prisma.employee_Service_Skill.findMany();
        res.status(200).json(employeeSkillLevels);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
