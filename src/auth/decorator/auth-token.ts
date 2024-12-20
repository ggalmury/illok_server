import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

import { INVALID_AUTH_TOKEN, AUTH_TOKEN_NOT_EXIST } from "@src/auth/constant/exception-message";

const AuthToken = createParamDecorator((_, context: ExecutionContext): string => {
  const request: Request = context.switchToHttp().getRequest();
  const authHeader: string = request.headers["authorization"];
  if (!authHeader) {
    throw new UnauthorizedException(AUTH_TOKEN_NOT_EXIST);
  }

  const parts: string[] = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new UnauthorizedException(INVALID_AUTH_TOKEN);
  }

  return parts[1];
});

export default AuthToken;
