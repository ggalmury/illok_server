import { Injectable } from "@nestjs/common";

import MemberEntity from "@src/member/entities/member.entity";
import SignatureDto from "@src/common/dtos/signature.dto";
import CreateMemberDto from "../dtos/create-member.dto";

@Injectable()
export default class MemberMapper {
  createDtoToEntity(createDto: CreateMemberDto): MemberEntity {
    const { visibility } = createDto;

    const entity: MemberEntity = new MemberEntity();
    entity.visibility = visibility;

    return entity;
  }

  entityToSignatureDto(entity: MemberEntity): SignatureDto {
    const { id, uuid } = entity;

    return new SignatureDto(id, uuid);
  }
}
