import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";

import { MEMBER_CONFLICT, MEMBER_NOT_FOUND } from "@src/member/constant/exception-message";

import MemberService from "@src/member/service/member.service";
import MemberRepository from "@src/member/repository/member.repository";
import MemberMapper from "@src/member/mapper/member.mapper";
import MemberEntity from "@src/member/entity/member.entity";
import CreateMemberDto from "@src/member/dto/create-member.dto";
import SignatureDto from "@src/common/dto/member-signature.dto";

export const MEMBER_SERVICE: string = "MEMBER_SERVICE";

@Injectable()
export default class MemberServiceImpl implements MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly memberMapper: MemberMapper,
  ) {}

  async createMember(identifier: string, createMemberDto: CreateMemberDto): Promise<void> {
    const foundMember: MemberEntity | null = await this.memberRepository.findOneByIdentifier(identifier);
    if (foundMember) {
      throw new ConflictException(MEMBER_CONFLICT);
    }

    const createdMember: MemberEntity = this.memberMapper.createDtoToEntity(createMemberDto);

    await this.memberRepository.insert(createdMember);
  }

  async getIdByIdentifier(identifier: string): Promise<number> {
    const foundMember: MemberEntity | null = await this.memberRepository.findOneByIdentifier(identifier);
    if (foundMember) {
      throw new ConflictException(MEMBER_CONFLICT);
    }

    return foundMember.id;
  }

  async getSignature(id: number): Promise<SignatureDto> {
    const foundMember: MemberEntity | null = await this.memberRepository.findOneById(id);
    if (!foundMember) {
      throw new NotFoundException(MEMBER_NOT_FOUND);
    }

    return this.memberMapper.entityToSignatureDto(foundMember);
  }
}
