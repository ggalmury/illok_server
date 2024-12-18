import { Injectable } from "@nestjs/common";

import { Role } from "@src/role/type/role";

import RoleEntity from "@src/role/entity/role.entity";

@Injectable()
export default class RoleMapper {
  entityToRole(entity: RoleEntity): Role {
    const { role } = entity;

    return role;
  }

  entitiesToRoles(entities: RoleEntity[]): Role[] {
    return entities.map((entity) => this.entityToRole(entity));
  }
}
