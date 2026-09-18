import { Router } from 'express';
import * as SpaceHandler from './space.controller.js';
import { isAuthenticated } from '../../middlewares/authorization.middleware.js';

const router = Router();

router.use(isAuthenticated);

router.post('/', SpaceHandler.createSpaceHandler);
router.get('/', SpaceHandler.getAllSpacesHandler);
router.get('/:id', SpaceHandler.getSpaceHandler);
router.patch('/:id', SpaceHandler.updateSpaceHandler);
router.post('/:id/join', SpaceHandler.joinSpaceHandler);
router.post('/:id/members', SpaceHandler.addMemberHandler);
router.patch('/:id/members/:userId', SpaceHandler.updateMemberRoleHandler);
router.delete('/:id/members/:userId', SpaceHandler.removeMemberHandler);
router.post('/:id/leave', SpaceHandler.leaveSpaceHandler);
router.post('/:id/accounts/:accountId', SpaceHandler.addAccountHandler);
router.delete('/:id/accounts/:accountId', SpaceHandler.removeAccountHandler);

export default router;
