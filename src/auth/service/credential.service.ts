import { LoginPlatform } from "@src/member/type/login-platform";

export default interface CredentialService {
  getLoginPlatform(memberId: number): Promise<LoginPlatform>;
}
