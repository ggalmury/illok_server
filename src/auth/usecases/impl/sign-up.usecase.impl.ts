import { Injectable, Inject, ConflictException, forwardRef } from "@nestjs/common";
import { Transactional } from "typeorm-transactional";

import { REGISTERED_MEMBER } from "@src/auth/constants/exception-message";

import { TOKEN_SERVICE } from "@src/auth/services/impl/token.service.impl";
import { MEMBER_SERVICE } from "@src/member/services/impl/member.service.impl";
import { CREDENTIAL_SERVICE } from "@src/credential/services/impl/credential.service.impl";
import { ROLE_SERVICE } from "@src/role/services/impl/role.service.impl";
import { PROFILE_SERVICE } from "@src/profile/services/impl/profile.service.impl";
import SignUpUsecase from "@src/auth/usecases/sign-up.usecase";
import TokenService from "@src/auth/services/token.service";
import MemberService from "@src/member/services/member.service";
import CredentialService from "@src/credential/services/credential.service";
import RoleService from "@src/role/services/role.service";
import ProfileService from "@src/profile/services/profile.service";
import MemberEntity from "@src/member/entities/member.entity";
import CredentialEntity from "@src/credential/entities/credential.entity";
import RoleEntity from "@src/role/entities/role.entity";
import ProfileEntity from "@src/profile/entities/profile.entity";
import SignUpReqDto from "@src/auth/dtos/request/sign-up-req.dto";
import TokenResDto from "@src/auth/dtos/response/token.res.dto";
import SignatureDto from "@src/common/dtos/signature.dto";
import TokenDto from "@src/auth/dtos/token.dto";

export const SIGN_UP_USECASE: string = "SIGN_UP_USECASE";

@Injectable()
export default class SignUpUsecaseImpl implements SignUpUsecase {
  constructor(
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
    @Inject(MEMBER_SERVICE) private readonly memberService: MemberService,
    @Inject(CREDENTIAL_SERVICE) private readonly credentialService: CredentialService,
    @Inject(ROLE_SERVICE) private readonly roleService: RoleService,
    @Inject(PROFILE_SERVICE) private readonly profileService: ProfileService,
  ) {}

  @Transactional()
  async execute(signUpReqDto: SignUpReqDto): Promise<TokenResDto> {
    const { member, credential, profile } = signUpReqDto;
    const { identifier, loginPlatform } = credential;

    const hasCredential: boolean = await this.credentialService.hasCredential(identifier);
    if (hasCredential) {
      throw new ConflictException(REGISTERED_MEMBER);
    }

    const createdMember: MemberEntity = this.memberService.createMember(member);
    const createdCredential: CredentialEntity = this.credentialService.createCredential(credential);
    const createdRole: RoleEntity = this.roleService.createRole();
    const createdProfile: ProfileEntity = this.profileService.createProfile(profile);

    const savedCredential: CredentialEntity = await this.credentialService.saveCredential(createdCredential);
    const savedRole: RoleEntity = await this.roleService.saveRole(createdRole);
    const savedProfile: ProfileEntity = await this.profileService.saveProfile(createdProfile);

    createdMember.credential = savedCredential;
    createdMember.roles = [savedRole];
    createdMember.profile = savedProfile;

    const savedMember: MemberEntity = await this.memberService.saveMember(createdMember);
    const signatureDto: SignatureDto = await this.memberService.getSignature(savedMember.id);

    const tokenDto: TokenDto = await this.tokenService.createAndSaveTokens(signatureDto, loginPlatform);

    return new TokenResDto(tokenDto);
  }
}
