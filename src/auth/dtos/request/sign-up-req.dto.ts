import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import CreateMemberDto from "@src/member/dtos/create-member.dto";
import CreateCredentialDto from "@src/credential/dtos/create-credential.dto";
import CreateProfileDto from "@src/profile/dtos/create-profile.dto";

export default class SignUpReqDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateMemberDto)
  readonly member: CreateMemberDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCredentialDto)
  readonly credential: CreateCredentialDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  readonly profile: CreateProfileDto;

  constructor(member: CreateMemberDto, credential: CreateCredentialDto, profile: CreateProfileDto) {
    this.member = member;
    this.credential = credential;
    this.profile = profile;
  }
}
