import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import ProfileServiceImpl, { PROFILE_SERVICE } from "@src/profile/service/impl/profile.service.impl";
import ProfileRepository from "@src/profile/repository/profile.repository";
import ProfileMapper from "@src/profile/mapper/profile.mapper";
import ProfileEntity from "@src/profile/entity/profile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  providers: [{ provide: PROFILE_SERVICE, useClass: ProfileServiceImpl }, ProfileRepository, ProfileMapper],
  exports: [PROFILE_SERVICE],
})
export default class ProfileModule {}
