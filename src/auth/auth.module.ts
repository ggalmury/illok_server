import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { JwtAccessTokenStrategy } from "@src/auth/strategies/jwt-access-token.strategy";
import { JwtRefreshTokenStrategy } from "@src/auth/strategies/jwt-refresh-token.strategy";
import JwtAccessTokenGuard from "@src/auth/guards/jwt-access-token.guard";
import JwtRefreshTokenGuard from "@src/auth/guards/jwt-refresh-token.guard";

import MemberModule from "@src/member/member.module";
import CredentialModule from "@src/credential/credential.module";
import RoleModule from "@src/role/role.module";
import ProfileModule from "@src/profile/profile.module";
import AuthUsecaseModule from "@src/auth/usecases/auth.usecase.module";
import AuthController from "@src/auth/controllers/auth.controller";
import TokenServiceImpl, { TOKEN_SERVICE } from "@src/auth/services/impl/token.service.impl";
import TokenRepositoryImpl, { TOKEN_REPOSITORY } from "@src/auth/repositories/impl/token.repository.impl";

@Module({
  imports: [
    JwtModule.register({}),
    MemberModule,
    CredentialModule,
    RoleModule,
    ProfileModule,
    forwardRef(() => AuthUsecaseModule),
  ],
  controllers: [AuthController],
  providers: [
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    JwtAccessTokenGuard,
    JwtRefreshTokenGuard,
    { provide: TOKEN_SERVICE, useClass: TokenServiceImpl },
    { provide: TOKEN_REPOSITORY, useClass: TokenRepositoryImpl },
  ],
  exports: [JwtAccessTokenGuard, JwtRefreshTokenGuard, TOKEN_SERVICE],
})
export default class AuthModule {}
