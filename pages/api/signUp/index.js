import { rewrites } from '@/next.config';
import { authMiddleware } from '../../../lib/authMiddleware';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prismaApp';

export default async function handler(req, res) {

  if (req.method === 'POST') {
    authMiddleware(req, res, async () => {

      const { first_name, last_name, birthday, email_address, phone_number, firebaseuID } = req.body;

      console.log(req.body)
      try {
        const userinfo = await prisma.clients.create({
          data: {
            first_name, 
            last_name, 
            birthday, 
            email_address, 
            phone_number,
            firebaseuID,
          }
        });
        return res.status(200).json({ success: true, data: userinfo });
      } catch (error) {
        return res.status(500).json({ success: false, error });
      }
    });
  }
}   