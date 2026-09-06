import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface RefreshTokensTable {
  id: Generated<number>;
  user_id: number;
  token_hash: string;
  expires_at: Date;
  created_at: ColumnType<Date, string | undefined, never>;
  revoked_at: Date | null;
}

export type RefreshToken = Selectable<RefreshTokensTable>;
export type NewRefreshToken = Insertable<RefreshTokensTable>;
export type RefreshTokenUpdate = Updateable<RefreshTokensTable>;
