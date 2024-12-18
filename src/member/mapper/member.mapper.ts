import { Injectable } from "@nestjs/common";

import { Role } from "@src/role/type/role";

import MemberEntity from "@src/member/entity/member.entity";
import MemberDto from "@src/member/dto/member.dto";
import CredentialDto from "@src/member/dto/credential.dto";

@Injectable()
export default class MemberMapper {
  entityToDto(entity: MemberEntity, roles: Role[]): MemberDto {
    const { uuid, loginPlatform, createdAt } = entity;

    return new MemberDto(uuid, loginPlatform, roles, createdAt);
  }

  entityToCredential(entity: MemberEntity, roles: Role[]): CredentialDto {
    const { id, uuid, loginPlatform } = entity;

    return new CredentialDto(id, uuid, loginPlatform, roles);
  }
}
