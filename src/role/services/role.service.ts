import { Role } from "@src/role/types/role";

import RoleEntity from "@src/role/entities/role.entity";

export default interface RoleService {
  createRole(role?: Role): RoleEntity;

  saveRole(entity: RoleEntity): Promise<RoleEntity>;

  getRoles(memberId: number): Promise<Role[]>;

  hasRoles(memberId: number, targetRoles: Role[]): Promise<boolean>;

  deleteSpecificRole(memberId: number, role: Role): Promise<void>;

  softDeleteRoles(memberId: number): Promise<void>;

  deleteRoles(memberId: number): Promise<void>;
}
