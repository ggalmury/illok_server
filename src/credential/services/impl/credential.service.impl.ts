import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";

import { CREDENTIAL_NOT_FOUND } from "@src/credential/constants/exception-message";
import { LoginPlatform } from "@src/member/types/login-platform";

import { CREDENTIAL_REPOSITORY } from "@src/credential/repositories/impl/credential.repository.impl";
import CredentialService from "@src/credential/services/credential.service";
import CredentialRepository from "@src/credential/repositories/credential.repository";
import CredentialEntity from "@src/credential/entities/credential.entity";
import CredentialMapper from "@src/credential/mappers/credential.mapper";
import CreateCredentialDto from "@src/credential/dtos/create-credential.dto";

export const CREDENTIAL_SERVICE: string = "CREDENTIAL_SERVICE";

@Injectable()
export default class CredentialServiceImpl implements CredentialService {
  constructor(
    @Inject(CREDENTIAL_REPOSITORY) private readonly credentialRepository: CredentialRepository,
    private readonly credentialMapper: CredentialMapper,
  ) {}

  createCredential(createCredentialDto: CreateCredentialDto): CredentialEntity {
    return this.credentialMapper.createDtoToEntity(createCredentialDto);
  }

  async saveCredential(entity: CredentialEntity): Promise<CredentialEntity> {
    return await this.credentialRepository.save(entity);
  }

  async getLoginPlatform(memberId: number): Promise<LoginPlatform> {
    const foundCredential: CredentialEntity | null = await this.credentialRepository.findOneByMemberId(memberId);
    if (!foundCredential) {
      throw new UnauthorizedException(CREDENTIAL_NOT_FOUND);
    }

    return foundCredential.loginPlatform;
  }

  async hasCredential(identifier: string): Promise<boolean> {
    const foundedCredential: CredentialEntity | null = await this.credentialRepository.findOneByIdentifier(identifier);

    return foundedCredential ? true : false;
  }

  async softDeleteCredential(memberId: number): Promise<void> {
    await this.credentialRepository.softDeleteByMemberId(memberId);
  }

  async deleteCredential(memberId: number): Promise<void> {
    await this.credentialRepository.deleteByMemberId(memberId);
  }
}
