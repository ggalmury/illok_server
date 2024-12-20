import { LoginPlatform } from "@src/member/type/login-platform";

import CreateCredentialDto from "@src/auth/dto/create-credential.dto";

export default interface CredentialService {
  createCredential(memberId: number, createCredentialDto: CreateCredentialDto): Promise<void>;

  getLoginPlatform(memberId: number): Promise<LoginPlatform>;
}
