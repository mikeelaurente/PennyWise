export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: {
    name: string;
    email: string;
  };
};
