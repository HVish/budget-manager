import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { isKnownError, ServerError } from './utils/error';
import registerRoutes from './routes';
import { StatusCodes } from 'http-status-codes';

function createServer(): Express {
  const app = express();

  // middlewares
  app.use(cors());
  app.use(express.json());

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // app routes
  registerRoutes(app);

  app.get('/ping', (_req, res) => {
    res.status(StatusCodes.OK).json({ message: 'pong' });
  });

  app.use(
    (
      error: ServerError | Error,
      _req: Request,
      res: Response,
      _next: NextFunction
    ) => {
      if (isKnownError(error)) {
        res.status(error.code).json({
          ...error.extras,
          message: error.message,
        });
      } else {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        });
      }
    }
  );

  return app;
}

const server = createServer();

export default server;
