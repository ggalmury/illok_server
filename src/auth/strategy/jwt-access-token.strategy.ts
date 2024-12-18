import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { INVALID_AUTH_TOKEN } from "@src/auth/constant/exception-message";
import { AccessTokenPayload } from "@src/auth/type/token-payload";

import { MEMBER_SERVICE } from "@src/member/service/impl/member.service.impl";
import MemberService from "@src/member/service/member.service";
import CredentialDto from "@src/member/dto/credential.dto";

export const ACCESS_TOKEN_STRATEGY: string = "ACCESS_TOKEN_STRATEGY";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN_STRATEGY) {
  constructor(
    configService: ConfigService,
    @Inject(MEMBER_SERVICE) private readonly memberService: MemberService,
  ) {
    super({
      secretOrKey: configService.get<string>("ACCESS_TOKEN_KEY"),
      issuer: configService.get<string>("JWT_ISSUER"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: AccessTokenPayload): Promise<CredentialDto> {
    const { id, uuid, loginPlatform } = payload;

    const foundCredential: CredentialDto = await this.memberService.getMemberCredential(id);
    if (
      !foundCredential ||
      id !== foundCredential.id ||
      uuid !== foundCredential.uuid ||
      loginPlatform !== foundCredential.loginPlatform
    ) {
      throw new UnauthorizedException(INVALID_AUTH_TOKEN);
    }

    return foundCredential;
  }
}
