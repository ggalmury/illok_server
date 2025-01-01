import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import RoleGuard from "@src/role/guards/role.guard";
import RoleServiceImpl, { ROLE_SERVICE } from "@src/role/services/impl/role.service.impl";
import RoleRepositoryImpl, { ROLE_REPOSITORY } from "@src/role/repositories/impl/role.repository.impl";
import RoleMapper from "@src/role/mappers/role.mapper";
import RoleEntity from "@src/role/entities/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [
    RoleGuard,
    { provide: ROLE_SERVICE, useClass: RoleServiceImpl },
    { provide: ROLE_REPOSITORY, useClass: RoleRepositoryImpl },
    RoleMapper,
  ],
  exports: [RoleGuard, ROLE_SERVICE],
})
export default class RoleModule {}
