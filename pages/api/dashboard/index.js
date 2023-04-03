import { rewrites } from '@/next.config';
import { authMiddleware } from '../../../lib/authMiddleware';
import jwt from 'jsonwebtoken';


export default async function handler(req, res) {
  if (req.method === 'GET') {
    authMiddleware(req, res, async () => {
      //prsima here
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 

  // to check if token is valid 
  //https://firebase.google.com/docs/auth/admin/verify-id-tokens#web

