import { rewrites } from '@/next.config';
import { authMiddleware } from '../../../lib/authMiddleware';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prismaApp';

export default async function handler(req, res) {

  if (req.method === 'POST') {
    authMiddleware(req, res, async () => {

      const { first_name, last_name, phone_number, email_address, address_1, address_2, city, state, zip_code   } = req.body;

      console.log(req.body)
      try {
        const userinfo = await prisma.employee.create({
          data: {
            first_name: first_name, 
            last_name: last_name,
            phone_number: phone_number,
            email_address: email_address,
            address_1: address_1,
            address_2: address_2,
            city: city,
            state: state,
            zip_code: zip_code,
            Client_statusID: 1
          }
        });
        return res.status(200).json({ success: true, data: userinfo });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error });
      }
    });
  }
} 