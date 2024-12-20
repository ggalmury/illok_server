import { Injectable } from "@nestjs/common";

import { Role } from "@src/auth/type/role";

import RoleEntity from "@src/auth/entity/role.entity";

@Injectable()
export default class RoleMapper {
  toEntity(memberId: number, role: Role): RoleEntity {
    const entity: RoleEntity = new RoleEntity();
    entity.member.id = memberId;
    entity.role = role;

    return entity;
  }

  entityToRole(entity: RoleEntity): Role {
    const { role } = entity;

    return role;
  }

  entitiesToRoles(entities: RoleEntity[]): Role[] {
    return entities.map((entity) => this.entityToRole(entity));
  }
}
