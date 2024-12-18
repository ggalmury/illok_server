import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import RoleModule from "@src/role/role.module";
import MemberServiceImpl, { MEMBER_SERVICE } from "@src/member/service/impl/member.service.impl";
import MemberRepository from "@src/member/repository/member.repository";
import MemberMapper from "@src/member/mapper/member.mapper";
import MemberEntity from "@src/member/entity/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity]), RoleModule],
  providers: [{ provide: MEMBER_SERVICE, useClass: MemberServiceImpl }, MemberRepository, MemberMapper],
  exports: [MEMBER_SERVICE],
})
export default class MemberModule {}
