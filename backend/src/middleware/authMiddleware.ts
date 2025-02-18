import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface DecodedToken {
  _id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

      // Attach user to request
      req.user = await User.findById(decoded._id).select('-password');

      if (!req.user) return res.status(401).json({ message: 'User not found' });

      next();
    } catch (error) {
      console.error('JWT Error:', error);
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};
