import { Role } from "@src/role/type/role";

export default interface RoleService {
  createRole(memberId: number, role?: Role): Promise<void>;

  getMemberRoles(memberId: number): Promise<Role[]>;

  softDeleteRole(memberId: number, role: Role): Promise<void>;

  hasRole(memberId: number, role: Role): Promise<boolean>;
}
