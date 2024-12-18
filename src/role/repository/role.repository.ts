import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import { Role } from "@src/role/type/role";

import RoleEntity from "@src/role/entity/role.entity";

@Injectable()
export default class RoleRepository extends Repository<RoleEntity> {
  constructor(dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  async findSpecificOneByMemberId(memberId: number, role: Role): Promise<RoleEntity | null> {
    return await this.findOne({ where: { member: { id: memberId }, role } });
  }

  async findByMemberId(memberId: number): Promise<RoleEntity[]> {
    return await this.find({ where: { member: { id: memberId } } });
  }

  async softDeleteById(id: number): Promise<void> {
    await this.softDelete({ id });
  }
}
