import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

import CredentialDto from "@src/member/dto/credential.dto";

const ExtractMemberId = createParamDecorator((_, context: ExecutionContext): number => {
  const request: Request = context.switchToHttp().getRequest();
  const credentialDto: CredentialDto = request.user as CredentialDto;
  const memberId: number = credentialDto.id;

  return memberId;
});

export default ExtractMemberId;
