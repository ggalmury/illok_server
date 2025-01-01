import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import CredentialServiceImpl, { CREDENTIAL_SERVICE } from "@src/credential/services/impl/credential.service.impl";
import CredentialRepositoryImpl, {
  CREDENTIAL_REPOSITORY,
} from "@src/credential/repositories/impl/credential.repository.impl";
import CredentialMapper from "@src/credential/mappers/credential.mapper";
import CredentialEntity from "@src/credential/entities/credential.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CredentialEntity])],
  providers: [
    { provide: CREDENTIAL_SERVICE, useClass: CredentialServiceImpl },
    { provide: CREDENTIAL_REPOSITORY, useClass: CredentialRepositoryImpl },
    CredentialMapper,
  ],
  exports: [CREDENTIAL_SERVICE],
})
export default class CredentialModule {}
