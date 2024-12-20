import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import ProfileEntity from "@src/profile/entity/profile.entity";

@Injectable()
export default class ProfileRepository extends Repository<ProfileEntity> {
  constructor(dataSource: DataSource) {
    super(ProfileEntity, dataSource.createEntityManager());
  }

  async findByMemberId(memberId: number): Promise<ProfileEntity[]> {
    return await this.find({ where: { member: { id: memberId } } });
  }

  async softDeleteByMemberId(memberId: number): Promise<void> {
    await this.softDelete({ member: { id: memberId } });
  }
}
