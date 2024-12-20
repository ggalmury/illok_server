import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

const ExtractMemberId = createParamDecorator((_, context: ExecutionContext): number => {
  const request: Request = context.switchToHttp().getRequest();

  return request.user as number;
});

export default ExtractMemberId;
