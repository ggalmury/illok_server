import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RolesGuard } from "@src/role/strategy/role.strategy";

import RoleServiceImpl, { ROLE_SERVICE } from "@src/role/service/impl/role.service.impl";
import RoleRepository from "@src/role/repository/role.repository";
import RoleMapper from "@src/role/mapper/role.mapper";
import RoleEntity from "@src/role/entity/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [{ provide: ROLE_SERVICE, useClass: RoleServiceImpl }, RolesGuard, RoleRepository, RoleMapper],
  exports: [ROLE_SERVICE, RolesGuard],
})
export default class RoleModule {}
