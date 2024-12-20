import { Injectable } from "@nestjs/common";

import MemberEntity from "@src/member/entity/member.entity";
import SignatureDto from "@src/common/dto/member-signature.dto";

@Injectable()
export default class MemberMapper {
  entityToSignatureDto(entity: MemberEntity): SignatureDto {
    const { id, uuid } = entity;

    return new SignatureDto(id, uuid);
  }
}
