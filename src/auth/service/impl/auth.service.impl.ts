import { Injectable } from "@nestjs/common";

import AuthService from "@src/auth/service/auth.service";

export const AUTH_SERVICE: string = "AUTH_SERVICE";

@Injectable()
export default class AuthServiceImpl implements AuthService {
  constructor() {}
}
