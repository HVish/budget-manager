import { Express, Router } from 'express';

import WalletController from '../controllers/wallets';

const registerWalletRoutes = (app: Express) => {
  const routes = Router();

  routes.get('/', WalletController.getAll);
  routes.post('/', WalletController.create);
  routes.patch('/:walletId', WalletController.update);
  routes.delete('/:walletId', WalletController.remove);

  app.use('/wallets', routes);
};

export default registerWalletRoutes;
