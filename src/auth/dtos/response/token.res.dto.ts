import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import TokenDto from "@src/auth/dtos/token.dto";

export default class TokenResDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TokenDto)
  readonly token: TokenDto;

  constructor(token: TokenDto) {
    this.token = token;
  }
}
