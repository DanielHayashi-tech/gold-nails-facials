import { rewrites } from '@/next.config';
import { authMiddleware } from '../../lib/authMiddleware';
import jwt from 'jsonwebtoken';




// export default function handler(req, res) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next()
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
//   console.log("test")
//   return res.status(405).json({ message: 'Method not allowed' });
  
//   }

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

