import { Express, Router } from 'express';

import TagController from '../controllers/tags';

const registerTagRoutes = (app: Express) => {
  const routes = Router();

  routes.get('/', TagController.getAll);
  routes.post('/', TagController.create);
  routes.patch('/:tagId', TagController.update);
  routes.delete('/:tagId', TagController.remove);

  app.use('/tags', routes);
};

export default registerTagRoutes;
