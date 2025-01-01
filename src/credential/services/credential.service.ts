import { LoginPlatform } from "@src/member/types/login-platform";

import CredentialEntity from "@src/credential/entities/credential.entity";
import CreateCredentialDto from "@src/credential/dtos/create-credential.dto";

export default interface CredentialService {
  createCredential(createCredentialDto: CreateCredentialDto): CredentialEntity;

  saveCredential(entity: CredentialEntity): Promise<CredentialEntity>;

  getLoginPlatform(memberId: number): Promise<LoginPlatform>;

  hasCredential(identifier: string): Promise<boolean>;

  softDeleteCredential(memberId: number): Promise<void>;

  deleteCredential(memberId: number): Promise<void>;
}
