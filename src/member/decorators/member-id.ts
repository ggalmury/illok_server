import { Request } from "express";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const MemberId = createParamDecorator((_, context: ExecutionContext): number => {
  const request: Request = context.switchToHttp().getRequest();

  return request.user as number;
});

export default MemberId;
