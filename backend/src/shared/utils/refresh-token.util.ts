import crypto from 'crypto';

export const hashRefreshToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString('hex');
};
