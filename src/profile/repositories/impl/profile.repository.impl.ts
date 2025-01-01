import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import ProfileRepository from "@src/profile/repositories/profile.repository";
import ProfileEntity from "@src/profile/entities/profile.entity";

export const PROFILE_REPOSITORY: string = "PROFILE_REPOSITORY";

@Injectable()
export default class ProfileRepositoryImpl implements ProfileRepository {
  constructor(@InjectRepository(ProfileEntity) private readonly repository: Repository<ProfileEntity>) {}

  async save(entity: ProfileEntity): Promise<ProfileEntity> {
    return await this.repository.save(entity);
  }

  async findOneByMemberId(memberId: number): Promise<ProfileEntity | null> {
    return await this.repository.findOne({ where: { memberId } });
  }

  async softDeleteByMemberId(memberId: number): Promise<void> {
    await this.repository.softDelete({ memberId });
  }

  async deleteByMemberId(memberId: number): Promise<void> {
    await this.repository.delete({ memberId });
  }
}
