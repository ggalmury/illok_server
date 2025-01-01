import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { ACCESS_TOKEN_STRATEGY } from "@src/auth/strategies/jwt-access-token.strategy";

@Injectable()
export default class JwtAccessTokenGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY) {}
