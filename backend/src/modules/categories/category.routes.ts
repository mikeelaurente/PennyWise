import { Router } from 'express';
import * as CategoryHandler from './category.controller.js';
import { isAuthenticated } from '../../middlewares/authorization.middleware.js';

const router = Router();

router.use(isAuthenticated);

router.post('/', CategoryHandler.createCategoryHandler);
router.get('/', CategoryHandler.getAllCategoriesHandler);
router.get('/:id', CategoryHandler.getCategoryHandler);
router.patch('/:id', CategoryHandler.updateCategoryHandler);
router.delete('/:id', CategoryHandler.deleteCategoryHandler);

export default router;
