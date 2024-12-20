import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { LoginPlatform } from "@src/member/type/login-platform";
import { AccessTokenPayload, RefreshTokenPayload } from "@src/auth/type/token-payload";

import TokenService from "@src/auth/service/token.service";
import RefreshTokenRepository from "@src/auth/repository/refresh-token.repository";
import SignatureDto from "@src/common/dto/member-signature.dto";
import TokenDto from "@src/auth/dto/token.dto";

export const TOKEN_SERVICE: string = "TOKEN_SERVICE";

@Injectable()
export default class TokenServiceImpl implements TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async generateAndSaveTokens(signatureDto: SignatureDto, loginPlatform: LoginPlatform): Promise<TokenDto> {
    const { id } = signatureDto;
    const accessTokenPayload: AccessTokenPayload = this.getAccessTokenPayload(signatureDto, loginPlatform);
    const refreshTokenPayload: RefreshTokenPayload = this.getRefreshTokenPayload(signatureDto);

    const tokenDto: TokenDto = this.generateTokens(accessTokenPayload, refreshTokenPayload);
    const refreshToken: string = tokenDto.refreshToken;

    await this.refreshTokenRepository.setToken(id, refreshToken);

    return tokenDto;
  }

  async getRefreshToken(id: number): Promise<string | null> {
    return await this.refreshTokenRepository.getToken(id);
  }

  async deleteRefreshToken(id: number): Promise<void> {
    await this.refreshTokenRepository.deleteToken(id);
  }

  private generateTokens(accessTokenPayload: AccessTokenPayload, refreshTokenPayload: RefreshTokenPayload): TokenDto {
    const accessToken: string = this.generateAccessToken(accessTokenPayload);
    const refreshToken: string = this.generateRefreshToken(refreshTokenPayload);

    return new TokenDto(accessToken, refreshToken);
  }

  private generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      issuer: this.configService.get<string>("JWT_ISSUER"),
      expiresIn: this.configService.get<string>("ACCESS_TOKEN_EXP"),
      secret: this.configService.get<string>("ACCESS_TOKEN_KEY"),
    });
  }

  private generateRefreshToken(payload: RefreshTokenPayload): string {
    return this.jwtService.sign(payload, {
      issuer: this.configService.get<string>("JWT_ISSUER"),
      expiresIn: this.configService.get<string>("REFRESH_TOKEN_EXP"),
      secret: this.configService.get<string>("REFRESH_TOKEN_KEY"),
    });
  }

  private getAccessTokenPayload(signatureDto: SignatureDto, loginPlatform: LoginPlatform): AccessTokenPayload {
    const { id, uuid } = signatureDto;

    return { id, uuid, loginPlatform };
  }

  private getRefreshTokenPayload(signatureDto: SignatureDto): RefreshTokenPayload {
    const { id, uuid } = signatureDto;

    return { id, uuid };
  }
}
