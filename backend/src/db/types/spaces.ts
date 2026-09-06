import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface SpacesTable {
  id: Generated<number>;
  name: string;
  space_type: string;
  created_by_user_id: number;
  created_at: Date;
}

export interface SpaceMembersTable {
  space_id: number;
  user_id: number;
  role: string;
}

export interface SpaceAccountsTable {
  space_id: number;
  account_id: number;
}

export type Space = Selectable<SpacesTable>;
export type NewSpace = Insertable<SpacesTable>;
export type SpaceUpdate = Updateable<SpacesTable>;

export type SpaceMember = Selectable<SpaceMembersTable>;
export type NewSpaceMember = Insertable<SpaceMembersTable>;

export type SpaceAccount = Selectable<SpaceAccountsTable>;
export type NewSpaceAccount = Insertable<SpaceAccountsTable>;
