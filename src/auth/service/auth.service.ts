import { Injectable } from "@nestjs/common";

import TokenService from "@src/auth/service/token.service";

@Injectable()
export default class AuthService {
  constructor(private readonly tokenService: TokenService) {}
}
