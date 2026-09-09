import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';

export const generateToken = (userId: number) => {
  const secret = env.JWT_SECRET_KEY;
  const expiresIn = Number(process.env.JWT_EXPIRATION_IN_MINUTES) || 60; // Default to 60 minutes if not set

  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { userId },
      secret,
      { algorithm: 'HS256', expiresIn: `${expiresIn}min` },
      function (err, token) {
        if (err) {
          reject(err);
        } else {
          resolve(token as string);
        }
      },
    );
  });
};

export const verifyToken = <TReturn = {}>(token: string) => {
  const privateKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
  return new Promise<TReturn>((resolve, reject) => {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as TReturn);
      }
    });
  });
};
