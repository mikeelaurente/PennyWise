import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export type SpaceType = 'personal' | 'shared';
export type SpaceRole = 'owner' | 'member';

export interface SpacesTable {
  id: Generated<number>;
  name: string;
  space_type: SpaceType;
  created_by_user_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface SpaceMembersTable {
  space_id: number;
  user_id: number;
  role: SpaceRole;
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
