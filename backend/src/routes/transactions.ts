import { Express, Router } from 'express';

import TransactionController from '../controllers/transactions';

const registerTransactionRoutes = (app: Express) => {
  const routes = Router();

  routes.post('/', TransactionController.create);

  app.use('/transactions', routes);
};

export default registerTransactionRoutes;
