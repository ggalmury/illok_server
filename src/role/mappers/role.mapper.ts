import { Injectable } from "@nestjs/common";

import { Role } from "@src/role/types/role";

import RoleEntity from "@src/role/entities/role.entity";

@Injectable()
export default class RoleMapper {
  toEntity(role: Role): RoleEntity {
    const entity: RoleEntity = new RoleEntity();
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
