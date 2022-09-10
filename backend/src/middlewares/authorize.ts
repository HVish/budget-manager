import { NextFunction, Request, Response } from 'express';
import { config } from '../config';

export function authorize(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  if (token !== config.authToken) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  // TODO: remove hard-coded userId
  req.userId = 'default-admin-userId';

  next();
}
