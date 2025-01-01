import { Injectable, Inject, NotFoundException } from "@nestjs/common";

import { ROLE_NOT_FOUND } from "@src/role/constants/exception-message";
import { Role } from "@src/role/types/role";

import { ROLE_REPOSITORY } from "@src/role/repositories/impl/role.repository.impl";
import RoleService from "@src/role/services/role.service";
import RoleRepository from "@src/role/repositories/role.repository";
import RoleMapper from "@src/role/mappers/role.mapper";
import RoleEntity from "@src/role/entities/role.entity";

export const ROLE_SERVICE: string = "ROLE_SERVICE";

@Injectable()
export default class RoleServiceImpl implements RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: RoleRepository,
    private readonly roleMapper: RoleMapper,
  ) {}

  createRole(role: Role = Role.MEMBER): RoleEntity {
    return this.roleMapper.toEntity(role);
  }

  async saveRole(entity: RoleEntity): Promise<RoleEntity> {
    return await this.roleRepository.save(entity);
  }

  async getRoles(memberId: number): Promise<Role[]> {
    const foundRoles: RoleEntity[] = await this.roleRepository.findByMemberId(memberId);

    return this.roleMapper.entitiesToRoles(foundRoles);
  }

  async hasRoles(memberId: number, targetRoles: Role[]): Promise<boolean> {
    const foundRoles: RoleEntity[] = await this.roleRepository.findByMemberId(memberId);
    const foundRoleNames: Role[] = foundRoles.map((foundRole) => foundRole.role);

    return targetRoles.some((targetRole) => foundRoleNames.includes(targetRole));
  }

  async deleteSpecificRole(memberId: number, role: Role): Promise<void> {
    const foundedRole: RoleEntity | null = await this.roleRepository.findSpecificOneByMemberId(memberId, role);
    if (!foundedRole) {
      throw new NotFoundException(ROLE_NOT_FOUND);
    }

    await this.roleRepository.deleteById(foundedRole.id);
  }

  async softDeleteRoles(memberId: number): Promise<void> {
    await this.roleRepository.softDeleteByMemberId(memberId);
  }

  async deleteRoles(memberId: number): Promise<void> {
    await this.roleRepository.deleteByMemberId(memberId);
  }
}
