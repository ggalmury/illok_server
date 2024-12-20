import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import CredentialEntity from "@src/auth/entity/credential.entity";

@Injectable()
export default class CredentialRepository extends Repository<CredentialEntity> {
  constructor(dataSource: DataSource) {
    super(CredentialEntity, dataSource.createEntityManager());
  }

  async findOneByMemberId(memberId: number): Promise<CredentialEntity | null> {
    return await this.findOne({ where: { member: { id: memberId } } });
  }

  async softDeleteByMemberId(memberId: number): Promise<void> {
    await this.softDelete({ member: { id: memberId } });
  }
}
