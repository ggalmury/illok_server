import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import MemberServiceImpl, { MEMBER_SERVICE } from "@src/member/services/impl/member.service.impl";
import MemberRepositoryImpl, { MEMBER_REPOSITORY } from "@src/member/repositories/impl/member.repository.impl";
import MemberMapper from "@src/member/mappers/member.mapper";
import MemberEntity from "@src/member/entities/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  providers: [
    { provide: MEMBER_SERVICE, useClass: MemberServiceImpl },
    { provide: MEMBER_REPOSITORY, useClass: MemberRepositoryImpl },
    MemberMapper,
  ],
  exports: [MEMBER_SERVICE],
})
export default class MemberModule {}
