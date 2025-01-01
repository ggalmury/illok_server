import { Injectable, Inject, NotFoundException } from "@nestjs/common";

import { MEMBER_NOT_FOUND } from "@src/member/constants/exception-message";

import { MEMBER_REPOSITORY } from "@src/member/repositories/impl/member.repository.impl";
import MemberService from "@src/member/services/member.service";
import MemberRepository from "@src/member/repositories/member.repository";
import MemberMapper from "@src/member/mappers/member.mapper";
import MemberEntity from "@src/member/entities/member.entity";
import CreateMemberDto from "@src/member/dtos/create-member.dto";
import SignatureDto from "@src/common/dtos/signature.dto";

export const MEMBER_SERVICE: string = "MEMBER_SERVICE";

@Injectable()
export default class MemberServiceImpl implements MemberService {
  constructor(
    @Inject(MEMBER_REPOSITORY) private readonly memberRepository: MemberRepository,
    private readonly memberMapper: MemberMapper,
  ) {}

  createMember(createMemberDto: CreateMemberDto): MemberEntity {
    return this.memberMapper.createDtoToEntity(createMemberDto);
  }

  async saveMember(entity: MemberEntity): Promise<MemberEntity> {
    return await this.memberRepository.save(entity);
  }

  async getSignature(id: number): Promise<SignatureDto> {
    const foundMember: MemberEntity | null = await this.memberRepository.findOneById(id);
    if (!foundMember) {
      throw new NotFoundException(MEMBER_NOT_FOUND);
    }

    return this.memberMapper.entityToSignatureDto(foundMember);
  }
}
