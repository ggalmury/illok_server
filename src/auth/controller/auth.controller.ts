import { Controller, UseGuards } from "@nestjs/common";

import { RolesGuard } from "@src/role/strategy/role.strategy";
import JwtAccessTokenGuard from "@src/auth/guard/jwt-access-token.guard";

import AuthService from "@src/auth/service/auth.service";

@Controller("auth")
@UseGuards(JwtAccessTokenGuard, RolesGuard)
export default class AuthController {
  constructor(private readonly authService: AuthService) {}
}
