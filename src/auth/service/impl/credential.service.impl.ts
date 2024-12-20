import { Injectable, UnauthorizedException } from "@nestjs/common";

import { CREDENTIAL_NOT_FOUND } from "@src/auth/constant/exception-message";
import { LoginPlatform } from "@src/member/type/login-platform";

import CredentialService from "@src/auth/service/credential.service";
import CredentialRepository from "@src/auth/repository/credential.repository";
import CredentialEntity from "@src/auth/entity/credential.entity";

export const CREDENTIAL_SERVICE: string = "CREDENTIAL_SERVICE";

@Injectable()
export default class CredentialServiceImpl implements CredentialService {
  constructor(private readonly credentialRepository: CredentialRepository) {}

  async getLoginPlatform(memberId: number): Promise<LoginPlatform> {
    const foundCredential: CredentialEntity | null = await this.credentialRepository.findOneByMemberId(memberId);
    if (!foundCredential) {
      throw new UnauthorizedException(CREDENTIAL_NOT_FOUND);
    }

    return foundCredential.loginPlatform;
  }
}
