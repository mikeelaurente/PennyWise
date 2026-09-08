export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type NewUser = {
  name: string;
  email: string;
  password_hash: string;
};

export type CreatedUser = {
  id: number;
  name: string;
  email: string;
  password_hash?: string;
  created_at: Date;
  updated_at: Date;
};
