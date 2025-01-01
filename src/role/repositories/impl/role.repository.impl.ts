import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Role } from "@src/role/types/role";

import RoleRepository from "@src/role/repositories/role.repository";
import RoleEntity from "@src/role/entities/role.entity";

export const ROLE_REPOSITORY: string = "ROLE_REPOSITORY";

@Injectable()
export default class RoleRepositoryImpl implements RoleRepository {
  constructor(@InjectRepository(RoleEntity) private readonly repository: Repository<RoleEntity>) {}

  async save(entity: RoleEntity): Promise<RoleEntity> {
    return await this.repository.save(entity);
  }

  async findByMemberId(memberId: number): Promise<RoleEntity[]> {
    return await this.repository.find({ where: { memberId } });
  }

  async findSpecificOneByMemberId(memberId: number, role: Role): Promise<RoleEntity | null> {
    return await this.repository.findOne({ where: { memberId, role } });
  }

  async softDeleteById(id: number): Promise<void> {
    await this.repository.softDelete({ id });
  }

  async softDeleteByMemberId(memberId: number): Promise<void> {
    await this.repository.softDelete({ memberId });
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async deleteByMemberId(memberId: number): Promise<void> {
    await this.repository.delete({ memberId });
  }
}
