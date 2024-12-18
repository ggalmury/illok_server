import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";

import { ROLE_CONFLICT, ROLE_NOT_FOUND } from "@src/role/constant/exception-message";
import { Role } from "@src/role/type/role";

import RoleService from "@src/role/service/role.service";
import RoleRepository from "@src/role/repository/role.repository";
import RoleMapper from "@src/role/mapper/role.mapper";
import RoleEntity from "@src/role/entity/role.entity";

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

    const createdRole: RoleEntity = this.roleRepository.create({ member: { id: memberId }, role });

    await this.roleRepository.insert(createdRole);
  }

  async getMemberRoles(memberId: number): Promise<Role[]> {
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

  async hasRole(memberId: number, role: Role): Promise<boolean> {
    const foundRole: RoleEntity | null = await this.roleRepository.findSpecificOneByMemberId(memberId, role);

    return foundRole ? true : false;
  }
}
