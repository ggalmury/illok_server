import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import CredentialRepository from "@src/credential/repositories/credential.repository";
import CredentialEntity from "@src/credential/entities/credential.entity";

export const CREDENTIAL_REPOSITORY: string = "CREDENTIAL_REPOSITORY";

@Injectable()
export default class CredentialRepositoryImpl implements CredentialRepository {
  constructor(@InjectRepository(CredentialEntity) private readonly repository: Repository<CredentialEntity>) {}

  async save(entity: CredentialEntity): Promise<CredentialEntity> {
    return await this.repository.save(entity);
  }

  async findOneByMemberId(memberId: number): Promise<CredentialEntity | null> {
    return await this.repository.findOne({ where: { memberId } });
  }

  async findOneByIdentifier(identifier: string): Promise<CredentialEntity | null> {
    return await this.repository.findOne({ where: { identifier } });
  }

  async softDeleteByMemberId(memberId: number): Promise<void> {
    await this.repository.softDelete({ memberId });
  }

  async deleteByMemberId(memberId: number): Promise<void> {
    await this.repository.delete({ memberId });
  }
}
