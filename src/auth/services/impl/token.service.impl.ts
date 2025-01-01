import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { LoginPlatform } from "@src/member/types/login-platform";
import { AccessTokenPayload, RefreshTokenPayload } from "@src/auth/types/token-payload";

import { TOKEN_REPOSITORY } from "@src/auth/repositories/impl/token.repository.impl";
import TokenService from "@src/auth/services/token.service";
import TokenRepository from "@src/auth/repositories/token.repository";
import SignatureDto from "@src/common/dtos/signature.dto";
import TokenDto from "@src/auth/dtos/token.dto";

export const TOKEN_SERVICE: string = "TOKEN_SERVICE";

@Injectable()
export default class TokenServiceImpl implements TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(TOKEN_REPOSITORY) private readonly tokenRepository: TokenRepository,
  ) {}

  async createAndSaveTokens(signatureDto: SignatureDto, loginPlatform: LoginPlatform): Promise<TokenDto> {
    const { id } = signatureDto;
    const accessTokenPayload: AccessTokenPayload = this.getAccessTokenPayload(signatureDto, loginPlatform);
    const refreshTokenPayload: RefreshTokenPayload = this.getRefreshTokenPayload(signatureDto);

    const tokenDto: TokenDto = this.createTokens(accessTokenPayload, refreshTokenPayload);
    const refreshToken: string = tokenDto.refreshToken;

    await this.tokenRepository.setToken(id, refreshToken);

    return tokenDto;
  }

  createAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      issuer: this.configService.get<string>("JWT_ISSUER"),
      expiresIn: this.configService.get<string>("ACCESS_TOKEN_EXP"),
      secret: this.configService.get<string>("ACCESS_TOKEN_KEY"),
    });
  }

  createRefreshToken(payload: RefreshTokenPayload): string {
    return this.jwtService.sign(payload, {
      issuer: this.configService.get<string>("JWT_ISSUER"),
      expiresIn: this.configService.get<string>("REFRESH_TOKEN_EXP"),
      secret: this.configService.get<string>("REFRESH_TOKEN_KEY"),
    });
  }

  async getRefreshToken(id: number): Promise<string | null> {
    return await this.tokenRepository.getToken(id);
  }

  getAccessTokenPayload(signatureDto: SignatureDto, loginPlatform: LoginPlatform): AccessTokenPayload {
    const { id, uuid } = signatureDto;

    return { id, uuid, loginPlatform };
  }

  getRefreshTokenPayload(signatureDto: SignatureDto): RefreshTokenPayload {
    const { id, uuid } = signatureDto;

    return { id, uuid };
  }

  async deleteRefreshToken(id: number): Promise<void> {
    await this.tokenRepository.deleteToken(id);
  }

  private createTokens(accessTokenPayload: AccessTokenPayload, refreshTokenPayload: RefreshTokenPayload): TokenDto {
    const accessToken: string = this.createAccessToken(accessTokenPayload);
    const refreshToken: string = this.createRefreshToken(refreshTokenPayload);

    return new TokenDto(accessToken, refreshToken);
  }
}
