import { Injectable, NotFoundException } from "@nestjs/common";

import { MEMBER_NOT_FOUND } from "@src/member/constant/exception-message";

import MemberService from "@src/member/service/member.service";
import MemberRepository from "@src/member/repository/member.repository";
import MemberMapper from "@src/member/mapper/member.mapper";
import MemberEntity from "@src/member/entity/member.entity";
import SignatureDto from "@src/common/dto/member-signature.dto";

export const MEMBER_SERVICE: string = "MEMBER_SERVICE";

@Injectable()
export default class MemberServiceImpl implements MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly memberMapper: MemberMapper,
  ) {}

  async getSignature(id: number): Promise<SignatureDto> {
    const foundMember: MemberEntity | null = await this.memberRepository.findOneById(id);
    if (!foundMember) {
      throw new NotFoundException(MEMBER_NOT_FOUND);
    }

    return this.memberMapper.entityToSignatureDto(foundMember);
  }
}
