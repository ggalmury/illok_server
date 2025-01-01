import { IsNotEmpty, IsOptional, IsString } from "class-validator";

import { LoginPlatform } from "@src/member/types/login-platform";
import IsLoginPlatform from "@src/member/decorators/is-login-platform";

export default class CreateCredentialDto {
  @IsNotEmpty()
  @IsString()
  readonly identifier: string;

  @IsOptional()
  @IsString()
  readonly password: string | null;

  @IsNotEmpty()
  @IsLoginPlatform()
  readonly loginPlatform: LoginPlatform;

  constructor(identifier: string, password: string | null, loginPlatform: LoginPlatform) {
    this.identifier = identifier;
    this.password = password;
    this.loginPlatform = loginPlatform;
  }
}
