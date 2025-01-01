import { IsNotEmpty, IsString } from "class-validator";

export default class TokenDto {
  @IsNotEmpty()
  @IsString()
  readonly accessToken: string;

  @IsNotEmpty()
  @IsString()
  readonly refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
