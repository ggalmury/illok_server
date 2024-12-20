import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";

import { CREDENTIAL_CONFLICT, CREDENTIAL_NOT_FOUND } from "@src/auth/constant/exception-message";
import { LoginPlatform } from "@src/member/type/login-platform";

import CredentialService from "@src/auth/service/credential.service";
import CredentialRepository from "@src/auth/repository/credential.repository";
import CredentialEntity from "@src/auth/entity/credential.entity";
import CredentialMapper from "@src/auth/mapper/credential.mapper";
import CreateCredentialDto from "@src/auth/dto/create-credential.dto";

export const CREDENTIAL_SERVICE: string = "CREDENTIAL_SERVICE";

@Injectable()
export default class CredentialServiceImpl implements CredentialService {
  constructor(
    private readonly credentialRepository: CredentialRepository,
    private readonly credentialMapper: CredentialMapper,
  ) {}

  async createCredential(memberId: number, createCredentialDto: CreateCredentialDto): Promise<void> {
    const foundCredential: CredentialEntity | null = await this.credentialRepository.findOneByMemberId(memberId);
    if (foundCredential) {
      throw new ConflictException(CREDENTIAL_CONFLICT);
    }

    const createdCredential: CredentialEntity = this.credentialMapper.createDtoToEntity(memberId, createCredentialDto);

    await this.credentialRepository.insert(createdCredential);
  }

  async getLoginPlatform(memberId: number): Promise<LoginPlatform> {
    const foundCredential: CredentialEntity | null = await this.credentialRepository.findOneByMemberId(memberId);
    if (!foundCredential) {
      throw new UnauthorizedException(CREDENTIAL_NOT_FOUND);
    }

    return foundCredential.loginPlatform;
  }
}
