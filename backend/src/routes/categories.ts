import { Express, Router } from 'express';
import CategoryController from '../controllers/categories';

const registerCategoriesRoutes = (app: Express) => {
  const routes = Router();

  routes.get('/', CategoryController.getAll);
  routes.post('/', CategoryController.create);
  routes.patch('/:categoryId', CategoryController.update);
  routes.delete('/:categoryId', CategoryController.remove);

  app.use('/categories', routes);
};

export default registerCategoriesRoutes;
