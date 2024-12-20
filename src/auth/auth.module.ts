import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

import { JwtAccessTokenStrategy } from "@src/auth/strategy/jwt-access-token.strategy";
import { JwtRefreshTokenStrategy } from "@src/auth/strategy/jwt-refresh-token.strategy";
import JwtAccessTokenGuard from "@src/auth/guard/jwt-access-token.guard";
import JwtRefreshTokenGuard from "@src/auth/guard/jwt-refresh-token.guard";
import RoleGuard from "@src/auth/guard/role.guard";

import MemberModule from "@src/member/member.module";
import AuthController from "@src/auth/controller/auth.controller";
import AuthServiceImpl, { AUTH_SERVICE } from "@src/auth/service/impl/auth.service.impl";
import CredentialServiceImpl, { CREDENTIAL_SERVICE } from "@src/auth/service/impl/credential.service.impl";
import RoleServiceImpl, { ROLE_SERVICE } from "@src/auth/service/impl/role.service.impl";
import TokenServiceImpl, { TOKEN_SERVICE } from "@src/auth/service/impl/token.service.impl";
import CredentialRepository from "./repository/credential.repository";
import RefreshTokenRepository from "@src/auth/repository/refresh-token.repository";
import RoleRepository from "@src/auth/repository/role.repository";
import RoleMapper from "@src/auth/mapper/role.mapper";
import CredentialEntity from "@src/auth/entity/credential.entity";
import RoleEntity from "@src/auth/entity/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CredentialEntity, RoleEntity]), JwtModule.register({}), MemberModule],
  controllers: [AuthController],
  providers: [
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    JwtAccessTokenGuard,
    JwtRefreshTokenGuard,
    RoleGuard,
    { provide: AUTH_SERVICE, useClass: AuthServiceImpl },
    { provide: CREDENTIAL_SERVICE, useClass: CredentialServiceImpl },
    { provide: ROLE_SERVICE, useClass: RoleServiceImpl },
    { provide: TOKEN_SERVICE, useClass: TokenServiceImpl },
    CredentialRepository,
    RefreshTokenRepository,
    RoleRepository,
    RoleMapper,
  ],
  exports: [JwtAccessTokenGuard, JwtRefreshTokenGuard, RoleGuard],
})
export default class AuthModule {}
