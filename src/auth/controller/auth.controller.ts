import { Inject, Controller, UseGuards } from "@nestjs/common";

import JwtAccessTokenGuard from "@src/auth/guard/jwt-access-token.guard";

import { AUTH_SERVICE } from "../service/impl/auth.service.impl";
import AuthService from "@src/auth/service/auth.service";

@Controller("auth")
@UseGuards(JwtAccessTokenGuard)
export default class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: AuthService) {}
}
