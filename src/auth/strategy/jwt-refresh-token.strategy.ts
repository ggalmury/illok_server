import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { INVALID_AUTH_TOKEN } from "@src/auth/constant/exception-message";
import { RefreshTokenPayload } from "@src/auth/type/token-payload";

import { MEMBER_SERVICE } from "@src/member/service/impl/member.service.impl";
import MemberService from "@src/member/service/member.service";
import SignatureDto from "@src/common/dto/member-signature.dto";

export const REFRESH_TOKEN_STRATEGY: string = "REFRESH_TOKEN_STRATEGY";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, REFRESH_TOKEN_STRATEGY) {
  constructor(
    configService: ConfigService,
    @Inject(MEMBER_SERVICE) private readonly memberService: MemberService,
  ) {
    super({
      secretOrKey: configService.get<string>("REFRESH_TOKEN_KEY"),
      issuer: configService.get<string>("JWT_ISSUER"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: RefreshTokenPayload): Promise<number> {
    const { id, uuid } = payload;

    const foundSignature: SignatureDto = await this.memberService.getSignature(id);

    if (id !== foundSignature.id || uuid !== foundSignature.uuid) {
      throw new UnauthorizedException(INVALID_AUTH_TOKEN);
    }

    return id;
  }
}
