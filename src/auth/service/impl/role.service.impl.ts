import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";

import { ROLE_CONFLICT, ROLE_NOT_FOUND } from "@src/auth/constant/exception-message";
import { Role } from "@src/auth/type/role";

import RoleService from "@src/auth/service/role.service";
import RoleRepository from "@src/auth/repository/role.repository";
import RoleMapper from "@src/auth/mapper/role.mapper";
import RoleEntity from "@src/auth/entity/role.entity";

export const ROLE_SERVICE: string = "ROLE_SERVICE";

@Injectable()
export default class RoleServiceImpl implements RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly roleMapper: RoleMapper,
  ) {}

  async createRole(memberId: number, role: Role = Role.MEMBER): Promise<void> {
    const foundRole: RoleEntity | null = await this.roleRepository.findSpecificOneByMemberId(memberId, role);
    if (foundRole) {
      throw new ConflictException(ROLE_CONFLICT);
    }

    const createdRole: RoleEntity = this.roleMapper.toEntity(memberId, role);

    await this.roleRepository.insert(createdRole);
  }

  async getRoles(memberId: number): Promise<Role[]> {
    const foundRoles: RoleEntity[] = await this.roleRepository.findByMemberId(memberId);

    return this.roleMapper.entitiesToRoles(foundRoles);
  }

  async softDeleteRole(memberId: number, role: Role): Promise<void> {
    const foundRole: RoleEntity | null = await this.roleRepository.findSpecificOneByMemberId(memberId, role);
    if (!foundRole) {
      throw new NotFoundException(ROLE_NOT_FOUND);
    }

    const foundRoleId: number = foundRole.id;

    await this.roleRepository.softDeleteById(foundRoleId);
  }

  async hasRole(memberId: number, targetRoles: Role[]): Promise<boolean> {
    const foundRoles: RoleEntity[] = await this.roleRepository.findByMemberId(memberId);
    const foundRoleNames: Role[] = foundRoles.map((foundRole) => foundRole.role);

    return targetRoles.some((targetRole) => foundRoleNames.includes(targetRole));
  }
}
