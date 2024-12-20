import { Role } from "@src/auth/type/role";

export default interface RoleService {
  createRole(memberId: number, role?: Role): Promise<void>;

  getRoles(memberId: number): Promise<Role[]>;

  softDeleteRole(memberId: number, role: Role): Promise<void>;

  hasRole(memberId: number, targetRoles: Role[]): Promise<boolean>;
}
