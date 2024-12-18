import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

import CredentialDto from "@src/member/dto/credential.dto";

const ExtractCredential = createParamDecorator((_, context: ExecutionContext): CredentialDto => {
  const request: Request = context.switchToHttp().getRequest();
  const credentialDto: CredentialDto = request.user as CredentialDto;

  return credentialDto;
});

export default ExtractCredential;
