import { IsNotEmpty, IsString, IsNumber, IsArray, IsIn, ValidateNested } from "class-validator";

import { Role } from "@src/role/type/role";
import { LoginPlatform } from "@src/member/type/login-platform";
import IsLoginPlatform from "@src/member/decorator/is-login-platform";

export default class CredentialDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

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

  constructor(id: number, uuid: string, loginPlatform: LoginPlatform, roles: Role[]) {
    this.id = id;
    this.uuid = uuid;
    this.loginPlatform = loginPlatform;
    this.roles = roles;
  }
}
