import jwt from 'jsonwebtoken';
 
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
 
  const token = authHeader.split(' ')[1];
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_ST);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(402).json({ message: 'Invalid token' });
  }
};