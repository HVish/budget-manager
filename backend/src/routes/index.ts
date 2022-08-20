import { Express } from 'express';

import registerCategoryRoutes from './categories';
import registerTagRoutes from './tags';

const registerRoutes = (app: Express) => {
  registerCategoryRoutes(app);
  registerTagRoutes(app);
};

export default registerRoutes;
