import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import ProfileEntity from "@src/profile/entity/profile.entity";

@Injectable()
export default class ProfileRepository extends Repository<ProfileEntity> {
  constructor(dataSource: DataSource) {
    super(ProfileEntity, dataSource.createEntityManager());
  }

  async findOneByMemberId(memberId: number): Promise<ProfileEntity | null> {
    return await this.findOne({ where: { member: { id: memberId } } });
  }

  async softDeleteByMemberId(memberId: number): Promise<void> {
    await this.softDelete({ member: { id: memberId } });
  }
}
