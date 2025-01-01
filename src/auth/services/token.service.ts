import { LoginPlatform } from "@src/member/types/login-platform";
import { AccessTokenPayload, RefreshTokenPayload } from "@src/auth/types/token-payload";

import SignatureDto from "@src/common/dtos/signature.dto";
import TokenDto from "@src/auth/dtos/token.dto";

export default interface TokenService {
  createAndSaveTokens(signatureDto: SignatureDto, loginPlatform: LoginPlatform): Promise<TokenDto>;

  createAccessToken(payload: AccessTokenPayload): string;

  createRefreshToken(payload: RefreshTokenPayload): string;

  getRefreshToken(id: number): Promise<string | null>;

  getAccessTokenPayload(signatureDto: SignatureDto, loginPlatform: LoginPlatform): AccessTokenPayload;

  getRefreshTokenPayload(signatureDto: SignatureDto): RefreshTokenPayload;

  deleteRefreshToken(id: number): Promise<void>;
}
