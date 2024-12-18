import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { AccessTokenPayload, RefreshTokenPayload } from "@src/auth/type/token-payload";

import RefreshTokenRepository from "@src/auth/repository/refresh-token.repository";
import CredentialDto from "@src/member/dto/credential.dto";
import TokenDto from "@src/auth/dto/token.dto";

@Injectable()
export default class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async generateAndSaveTokens(credentialDto: CredentialDto): Promise<TokenDto> {
    const { id } = credentialDto;
    const accessTokenPayload: AccessTokenPayload = this.getAccessTokenPayload(credentialDto);
    const refreshTokenPayload: RefreshTokenPayload = this.getRefreshTokenPayload(credentialDto);

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

  private getAccessTokenPayload(credentialDto: CredentialDto): AccessTokenPayload {
    const { id, uuid, loginPlatform } = credentialDto;

    return { id, uuid, loginPlatform };
  }

  private getRefreshTokenPayload(credentialDto: CredentialDto): RefreshTokenPayload {
    const { id, uuid } = credentialDto;

    return { id, uuid };
  }
}
