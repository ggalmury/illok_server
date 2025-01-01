import { forwardRef, Module } from "@nestjs/common";

import AuthModule from "@src/auth/auth.module";
import MemberModule from "@src/member/member.module";
import CredentialModule from "@src/credential/credential.module";
import RoleModule from "@src/role/role.module";
import ProfileModule from "@src/profile/profile.module";
import SignUpUsecaseImpl, { SIGN_UP_USECASE } from "@src/auth/usecases/impl/sign-up.usecase.impl";

@Module({
  imports: [forwardRef(() => AuthModule), MemberModule, CredentialModule, RoleModule, ProfileModule],
  providers: [{ provide: SIGN_UP_USECASE, useClass: SignUpUsecaseImpl }],
  exports: [SIGN_UP_USECASE],
})
export default class AuthUsecaseModule {}
