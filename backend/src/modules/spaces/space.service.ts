import * as SpaceRepository from '../../db/repositories/spaces.js';
import { AppError } from '../../shared/utils/app-error.util.js';
import type {
  CreateSpaceInput,
  MemberInput,
  MemberRoleInput,
  SpaceQueryParams,
  UpdateSpaceInput,
} from './space.schema.js';

const requireMembership = async (spaceId: number, userId: number) => {
  const membership = await SpaceRepository.getMembership(spaceId, userId);

  if (!membership) {
    throw new AppError(404, 'Space not found.');
  }

  return membership;
};

const requireOwner = async (spaceId: number, userId: number) => {
  const membership = await requireMembership(spaceId, userId);

  if (membership.role !== 'owner') {
    throw new AppError(403, 'Only the space owner can perform this action.');
  }

  return membership;
};

export const getAllSpaces = async (
  userId: number,
  { search, type, page, limit }: SpaceQueryParams,
) =>
  SpaceRepository.getAllSpaces(
    userId,
    { search, type },
    limit,
    limit * (page - 1),
  );

export const getSpaceById = async (spaceId: number, userId: number) => {
  const space = await SpaceRepository.getSpaceById(spaceId, userId);

  if (!space) {
    throw new AppError(404, 'Space not found.');
  }

  return { ...space, members: await SpaceRepository.getMembers(spaceId) };
};

export const createSpace = async (userId: number, input: CreateSpaceInput) =>
  SpaceRepository.createSpace(
    { name: input.name, type: input.type, created_by_user_id: userId },
    userId,
  );

export const updateSpace = async (
  spaceId: number,
  userId: number,
  input: UpdateSpaceInput,
) => {
  await requireOwner(spaceId, userId);
  const updatedSpace = await SpaceRepository.updateSpace(spaceId, {
    ...(input.name !== undefined && { name: input.name }),
    ...(input.type !== undefined && { type: input.type }),
  });

  if (!updatedSpace) {
    throw new AppError(404, 'Space not found.');
  }

  return updatedSpace;
};

export const addMember = async (
  spaceId: number,
  userId: number,
  input: MemberInput,
) => {
  await requireOwner(spaceId, userId);

  if (input.userId === userId) {
    throw new AppError(409, 'The space owner is already a member.');
  }

  if (!(await SpaceRepository.getUser(input.userId))) {
    throw new AppError(404, 'User not found.');
  }

  if (await SpaceRepository.getMembership(spaceId, input.userId)) {
    throw new AppError(409, 'User is already a member of this space.');
  }

  return SpaceRepository.addMember(spaceId, input.userId);
};

export const joinSpace = async (spaceId: number, userId: number) => {
  if (!(await SpaceRepository.getSpace(spaceId))) {
    throw new AppError(404, 'Space not found.');
  }

  if (await SpaceRepository.getMembership(spaceId, userId)) {
    throw new AppError(409, 'User is already a member of this space.');
  }

  return SpaceRepository.addMember(spaceId, userId);
};

export const updateMemberRole = async (
  spaceId: number,
  userId: number,
  memberId: number,
  input: MemberRoleInput,
) => {
  await requireOwner(spaceId, userId);

  if (memberId === userId && input.role !== 'owner') {
    throw new AppError(409, 'The space must retain an owner.');
  }

  const member = await SpaceRepository.updateMemberRole(
    spaceId,
    memberId,
    input.role,
  );

  if (!member) {
    throw new AppError(404, 'Space member not found.');
  }

  return member;
};

export const removeMember = async (
  spaceId: number,
  userId: number,
  memberId: number,
) => {
  await requireOwner(spaceId, userId);

  if (memberId === userId) {
    throw new AppError(
      409,
      'The owner cannot remove themselves from the space.',
    );
  }

  const member = await SpaceRepository.removeMember(spaceId, memberId);

  if (!member) {
    throw new AppError(404, 'Space member not found.');
  }
};

export const leaveSpace = async (spaceId: number, userId: number) => {
  const membership = await requireMembership(spaceId, userId);

  if (membership.role === 'owner') {
    throw new AppError(409, 'The owner cannot leave the space.');
  }

  await SpaceRepository.removeMember(spaceId, userId);
};

export const addAccount = async (
  spaceId: number,
  userId: number,
  accountId: number,
) => {
  await requireMembership(spaceId, userId);

  if (!(await SpaceRepository.getAccount(accountId, userId))) {
    throw new AppError(404, 'Account not found.');
  }

  if (await SpaceRepository.getSpaceAccount(spaceId, accountId)) {
    throw new AppError(409, 'Account is already associated with this space.');
  }

  return SpaceRepository.addAccount(spaceId, accountId);
};

export const removeAccount = async (
  spaceId: number,
  userId: number,
  accountId: number,
) => {
  await requireMembership(spaceId, userId);
  const association = await SpaceRepository.removeAccount(spaceId, accountId);

  if (!association) {
    throw new AppError(404, 'Account association not found.');
  }
};
