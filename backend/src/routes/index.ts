import { Express } from 'express';
import registerAuthRoutes from './auth';

import registerCategoryRoutes from './categories';
import registerTagRoutes from './tags';
import registerTransactionRoutes from './transactions';
import registerWalletRoutes from './wallets';

const registerRoutes = (app: Express) => {
  registerAuthRoutes(app);
  registerCategoryRoutes(app);
  registerTagRoutes(app);
  registerWalletRoutes(app);
  registerTransactionRoutes(app);
};

export default registerRoutes;
