import { Inject, Injectable } from "@nestjs/common";

import { MEMBER_SERVICE } from "@src/member/service/impl/member.service.impl";
import { PROFILE_SERVICE } from "@src/profile/service/impl/profile.service.impl";
import { CREDENTIAL_SERVICE } from "@src/auth/service/impl/credential.service.impl";
import { ROLE_SERVICE } from "@src/auth/service/impl/role.service.impl";
import AuthService from "@src/auth/service/auth.service";
import MemberService from "@src/member/service/member.service";
import ProfileService from "@src/profile/service/profile.service";
import CredentialService from "@src/auth/service/credential.service";
import RoleService from "@src/auth/service/role.service";
import SignUpReqDto from "@src/auth/dto/request/sign-up-req.dto";

export const AUTH_SERVICE: string = "AUTH_SERVICE";

@Injectable()
export default class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(MEMBER_SERVICE) private readonly memberService: MemberService,
    @Inject(PROFILE_SERVICE) private readonly profileService: ProfileService,
    @Inject(CREDENTIAL_SERVICE) private readonly credentialService: CredentialService,
    @Inject(ROLE_SERVICE) private readonly roleService: RoleService,
  ) {}

  async signUp(signUpReqDto: SignUpReqDto): Promise<void> {}
}
