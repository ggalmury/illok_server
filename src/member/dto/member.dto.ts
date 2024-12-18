import { IsNotEmpty, IsString, IsArray, IsIn, ValidateNested, IsDate } from "class-validator";
import { Type } from "class-transformer";

import { Role } from "@src/role/type/role";
import { LoginPlatform } from "@src/member/type/login-platform";
import IsLoginPlatform from "@src/member/decorator/is-login-platform";

export default class MemberDto {
  @IsNotEmpty()
  @IsString()
  readonly uuid: string;

  @IsNotEmpty()
  @IsLoginPlatform()
  readonly loginPlatform: LoginPlatform;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @IsIn(Object.values(Role), { each: true })
  readonly roles: Role[];

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly createdAt: Date;

  constructor(uuid: string, loginPlatform: LoginPlatform, roles: Role[], createdAt: Date) {
    this.uuid = uuid;
    this.loginPlatform = loginPlatform;
    this.roles = roles;
    this.createdAt = createdAt;
  }
}
