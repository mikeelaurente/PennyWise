import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/utils/app-error.util.js";
import * as jwtHelper from "../shared/utils/jwt-helper.util.js";

export const isAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization || "";

  //split headers into parts
  const parts = authorization.split(" ");

  //check credentials
  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    throw new AppError(401, "Unauthorized");
  }

  const accessToken = parts[1];
  if (!accessToken || accessToken.length === 0) {
    throw new AppError(401, "Unauthorized");
  }

  try {
    const decoded = await jwtHelper.verifyToken<{ userId: number }>(
      accessToken,
    );

    if (!decoded.userId) {
      return next(new AppError(401, "Invalid token payload"));
    }

    req.user = {
      id: decoded.userId,
    };

    return next();
  } catch (error) {
    next(error);
  }
};
