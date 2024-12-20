import { Injectable } from "@nestjs/common";

import CredentialEntity from "../entity/credential.entity";
import CreateCredentialDto from "@src/auth/dto/create-credential.dto";

@Injectable()
export default class CredentialMapper {
  createDtoToEntity(memberId: number, createDto: CreateCredentialDto): CredentialEntity {
    const { identifier, password, loginPlatform } = createDto;

    const entity: CredentialEntity = new CredentialEntity();
    entity.member.id = memberId;
    entity.identifier = identifier;
    entity.password = password;
    entity.loginPlatform = loginPlatform;

    return entity;
  }
}
