import { rewrites } from '@/next.config';
import { authMiddleware } from '../../../lib/authMiddleware';
import jwt from 'jsonwebtoken';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    authMiddleware(req, res, async () => {
      //prsima here

        //client posts what services are needed

        //get prices for services

        //create new order with clientid, total price and date


        //create order service line for each of services with orderid and serviceid
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 