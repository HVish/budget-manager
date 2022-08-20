import { Express } from 'express';

import registerCategoryRoutes from './categories';
import registerTagRoutes from './tags';
import registerWalletRoutes from './wallets';

const registerRoutes = (app: Express) => {
  registerCategoryRoutes(app);
  registerTagRoutes(app);
  registerWalletRoutes(app);
};

export default registerRoutes;
