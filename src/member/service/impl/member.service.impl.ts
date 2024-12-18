import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { MEMBER_NOT_FOUND } from "@src/member/constant/exception-message";
import { Role } from "@src/role/type/role";

import { ROLE_SERVICE } from "@src/role/service/impl/role.service.impl";
import MemberService from "@src/member/service/member.service";
import RoleService from "@src/role/service/role.service";
import MemberRepository from "@src/member/repository/member.repository";
import MemberMapper from "@src/member/mapper/member.mapper";
import MemberEntity from "@src/member/entity/member.entity";
import CredentialDto from "@src/member/dto/credential.dto";

export const MEMBER_SERVICE: string = "MEMBER_SERVICE";

@Injectable()
export default class MemberServiceImpl implements MemberService {
  constructor(
    @Inject(ROLE_SERVICE) private readonly roleService: RoleService,
    private readonly memberRepository: MemberRepository,
    private readonly memberMapper: MemberMapper,
  ) {}

  async getMemberCredential(id: number): Promise<CredentialDto> {
    const foundMember: MemberEntity | null = await this.memberRepository.findOneById(id);
    if (!foundMember) {
      throw new NotFoundException(MEMBER_NOT_FOUND);
    }

    const foundRoles: Role[] = await this.roleService.getMemberRoles(id);

    return this.memberMapper.entityToCredential(foundMember, foundRoles);
  }
}
