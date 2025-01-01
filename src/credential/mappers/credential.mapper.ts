import { Injectable } from "@nestjs/common";

import CredentialEntity from "@src/credential/entities/credential.entity";
import CreateCredentialDto from "@src/credential/dtos/create-credential.dto";

@Injectable()
export default class CredentialMapper {
  createDtoToEntity(createDto: CreateCredentialDto): CredentialEntity {
    const { identifier, password, loginPlatform } = createDto;

    const entity: CredentialEntity = new CredentialEntity();
    entity.identifier = identifier;
    entity.password = password;
    entity.loginPlatform = loginPlatform;

    return entity;
  }
}
