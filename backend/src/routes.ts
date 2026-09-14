import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import accountRoutes from './modules/accounts/account.routes.js';
import categoryRoutes from './modules/categories/category.routes.js';
import spaceRoutes from './modules/spaces/space.routes.js';
import { errorHandler } from './shared/utils/error-handler.util.js';

export const createRoutes = (app: express.Router) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/accounts', accountRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/spaces', spaceRoutes);

  app.use(errorHandler);
};
