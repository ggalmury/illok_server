import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import ProfileServiceImpl, { PROFILE_SERVICE } from "@src/profile/services/impl/profile.service.impl";
import ProfileRepositoryImpl, { PROFILE_REPOSITORY } from "@src/profile/repositories/impl/profile.repository.impl";
import ProfileMapper from "@src/profile/mappers/profile.mapper";
import ProfileEntity from "@src/profile/entities/profile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  providers: [
    { provide: PROFILE_SERVICE, useClass: ProfileServiceImpl },
    { provide: PROFILE_REPOSITORY, useClass: ProfileRepositoryImpl },
    ProfileMapper,
  ],
  exports: [PROFILE_SERVICE],
})
export default class ProfileModule {}
