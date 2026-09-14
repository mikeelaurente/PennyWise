import type { Request, Response } from 'express';
import * as SpaceService from './space.service.js';
import {
  accountParamSchema,
  createSpaceSchema,
  memberInputSchema,
  memberParamSchema,
  memberRoleSchema,
  spaceIdParamSchema,
  spaceQuerySchema,
  updateSpaceSchema,
} from './space.schema.js';
import { asyncHandler } from '../../shared/utils/async-handler.util.js';

export const getAllSpacesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const input = spaceQuerySchema.parse(req.query);
    const spaces = await SpaceService.getAllSpaces(req.user!.id, input);
    return res
      .status(200)
      .json({
        status: 'ok',
        message: 'Spaces retrieved successfully.',
        data: spaces,
      });
  },
);

export const getSpaceHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = spaceIdParamSchema.parse(req.params);
    const space = await SpaceService.getSpaceById(id, req.user!.id);
    return res
      .status(200)
      .json({
        status: 'ok',
        message: 'Space retrieved successfully.',
        data: space,
      });
  },
);

export const createSpaceHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const input = createSpaceSchema.parse(req.body);
    const space = await SpaceService.createSpace(req.user!.id, input);
    return res
      .status(201)
      .json({
        status: 'ok',
        message: 'Space created successfully.',
        data: space,
      });
  },
);

export const updateSpaceHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = spaceIdParamSchema.parse(req.params);
    const input = updateSpaceSchema.parse(req.body);
    const space = await SpaceService.updateSpace(id, req.user!.id, input);
    return res
      .status(200)
      .json({
        status: 'ok',
        message: 'Space updated successfully.',
        data: space,
      });
  },
);

export const addMemberHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = spaceIdParamSchema.parse(req.params);
    const input = memberInputSchema.parse(req.body);
    const member = await SpaceService.addMember(id, req.user!.id, input);
    return res
      .status(201)
      .json({
        status: 'ok',
        message: 'Space member added successfully.',
        data: member,
      });
  },
);

export const joinSpaceHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = spaceIdParamSchema.parse(req.params);
    const member = await SpaceService.joinSpace(id, req.user!.id);
    return res
      .status(201)
      .json({
        status: 'ok',
        message: 'Joined space successfully.',
        data: member,
      });
  },
);

export const updateMemberRoleHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, userId } = memberParamSchema.parse(req.params);
    const input = memberRoleSchema.parse(req.body);
    const member = await SpaceService.updateMemberRole(
      id,
      req.user!.id,
      userId,
      input,
    );
    return res
      .status(200)
      .json({
        status: 'ok',
        message: 'Space member role updated successfully.',
        data: member,
      });
  },
);

export const removeMemberHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, userId } = memberParamSchema.parse(req.params);
    await SpaceService.removeMember(id, req.user!.id, userId);
    return res.status(204).send();
  },
);

export const leaveSpaceHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = spaceIdParamSchema.parse(req.params);
    await SpaceService.leaveSpace(id, req.user!.id);
    return res.status(204).send();
  },
);

export const addAccountHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, accountId } = accountParamSchema.parse(req.params);
    const association = await SpaceService.addAccount(
      id,
      req.user!.id,
      accountId,
    );
    return res
      .status(201)
      .json({
        status: 'ok',
        message: 'Account added to space successfully.',
        data: association,
      });
  },
);

export const removeAccountHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, accountId } = accountParamSchema.parse(req.params);
    await SpaceService.removeAccount(id, req.user!.id, accountId);
    return res.status(204).send();
  },
);
