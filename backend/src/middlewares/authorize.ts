import { NextFunction, Request, Response } from 'express';
import { config } from '../config';

export function authorize(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const [scheme, base64Credentials] = token.split(' ');

  if (scheme !== 'Basic' || !base64Credentials) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  try {
    const credentials = Buffer.from(base64Credentials, 'base64').toString();
    const [username, password] = credentials.split(':');

    if (username === config.app.user && password === config.app.pass) {
      // TODO: remove hard-coded userId
      req.userId = 'default-admin-userId';
      return next();
    }
  } catch (error) {
    console.error(error);
  }

  return res.status(401).json({ message: 'Authentication failed' });
}
