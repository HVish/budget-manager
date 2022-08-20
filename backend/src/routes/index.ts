import { Express } from 'express';
import registerCategoriesRoutes from './categories';

const registerRoutes = (app: Express) => {
  registerCategoriesRoutes(app);
};

export default registerRoutes;
