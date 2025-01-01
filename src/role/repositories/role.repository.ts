import { Role } from "@src/role/types/role";

import RoleEntity from "@src/role/entities/role.entity";

export default interface RoleRepository {
  save(entity: RoleEntity): Promise<RoleEntity>;

  findByMemberId(memberId: number): Promise<RoleEntity[]>;

  findSpecificOneByMemberId(memberId: number, role: Role): Promise<RoleEntity | null>;

  softDeleteById(id: number): Promise<void>;

  softDeleteByMemberId(memberId: number): Promise<void>;

  deleteById(id: number): Promise<void>;

  deleteByMemberId(memberId: number): Promise<void>;
}
