import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { JwtAccessTokenStrategy } from "@src/auth/strategy/jwt-access-token.strategy";
import { JwtRefreshTokenStrategy } from "@src/auth/strategy/jwt-refresh-token.strategy";
import JwtAccessTokenGuard from "@src/auth/guard/jwt-access-token.guard";
import JwtRefreshTokenGuard from "@src/auth/guard/jwt-refresh-token.guard";

import MemberModule from "@src/member/member.module";
import AuthController from "@src/auth/controller/auth.controller";
import AuthService from "@src/auth/service/auth.service";
import TokenService from "@src/auth/service/token.service";
import RefreshTokenRepository from "@src/auth/repository/refresh-token.repository";

@Module({
  imports: [JwtModule.register({}), MemberModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    RefreshTokenRepository,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    JwtAccessTokenGuard,
    JwtRefreshTokenGuard,
  ],
  exports: [JwtAccessTokenGuard, JwtRefreshTokenGuard],
})
export default class AuthModule {}
