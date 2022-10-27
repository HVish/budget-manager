import { Express, Router } from 'express';

import TransactionController from '../controllers/transactions';
import { authorize } from '../middlewares/authorize';

const registerTransactionRoutes = (app: Express) => {
  const routes = Router();

  routes.get('/', TransactionController.getAll);
  routes.post('/', TransactionController.create);
  routes.patch('/', TransactionController.update);
  routes.get('/stats', TransactionController.getStats);

  app.use('/transactions', authorize, routes);
};

export default registerTransactionRoutes;
