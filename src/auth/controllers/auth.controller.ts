import { Inject, Controller, Post, HttpCode, Body, UseGuards } from "@nestjs/common";

import { SIGN_UP_USECASE } from "@src/auth/usecases/impl/sign-up.usecase.impl";
import SignUpUsecase from "@src/auth/usecases/sign-up.usecase";
import SignUpReqDto from "@src/auth/dtos/request/sign-up-req.dto";
import TokenResDto from "@src/auth/dtos/response/token.res.dto";

@Controller("auth")
export default class AuthController {
  constructor(@Inject(SIGN_UP_USECASE) private readonly signUpUsecase: SignUpUsecase) {}

  @Post("sign-up")
  @HttpCode(201)
  async signUp(@Body() signUpReqDto: SignUpReqDto): Promise<TokenResDto> {
    return await this.signUpUsecase.execute(signUpReqDto);
  }
}
