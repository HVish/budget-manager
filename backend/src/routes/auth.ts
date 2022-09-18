import { Express, Router } from 'express';
import AuthController from '../controllers/auth';

const registerAuthRoutes = (app: Express) => {
  const routes = Router();

  routes.post('/login', AuthController.login);

  app.use('/auth', routes);
};

export default registerAuthRoutes;
