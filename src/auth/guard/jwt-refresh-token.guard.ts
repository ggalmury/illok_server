import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { REFRESH_TOKEN_STRATEGY } from "@src/auth/strategy/jwt-refresh-token.strategy";

@Injectable()
export default class JwtRefreshTokenGuard extends AuthGuard(REFRESH_TOKEN_STRATEGY) {}
