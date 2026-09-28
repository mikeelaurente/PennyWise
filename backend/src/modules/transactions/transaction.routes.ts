import { Router } from 'express';
import * as TransactionHandler from './transaction.controller.js';
import { isAuthenticated } from '../../middlewares/authorization.middleware.js';

const router = Router();

router.use(isAuthenticated);

router.post('/', TransactionHandler.createTransactionHandler);
router.get('/', TransactionHandler.getAllTransactionsHandler);
router.get('/:id', TransactionHandler.getTransactionHandler);
router.patch('/:id', TransactionHandler.updateTransactionHandler);
router.delete('/:id', TransactionHandler.deleteTransactionHandler);

export default router;

