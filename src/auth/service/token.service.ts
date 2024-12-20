import { LoginPlatform } from "@src/member/type/login-platform";

import SignatureDto from "@src/common/dto/member-signature.dto";
import TokenDto from "@src/auth/dto/token.dto";

export default interface TokenService {
  generateAndSaveTokens(signatureDto: SignatureDto, loginPlatform: LoginPlatform): Promise<TokenDto>;

  getRefreshToken(id: number): Promise<string | null>;

  deleteRefreshToken(id: number): Promise<void>;
}
