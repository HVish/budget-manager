import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '../config';

const login: RequestHandler<
  never,
  { token: string } | { error: string },
  { username: string; password: string }
> = async (req, res) => {
  const { username, password } = req.body;

  if (username !== config.app.user || password !== config.app.pass) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'Invalid username or password',
    });
  }

  return res.status(StatusCodes.OK).json({
    token: Buffer.from(`${username}:${password}`).toString('base64'),
  });
};

const AuthController = {
  login,
};

export default AuthController;
