import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { INVALID_AUTH_TOKEN } from "@src/auth/constants/exception-message";
import { AccessTokenPayload } from "@src/auth/types/token-payload";
import { LoginPlatform } from "@src/member/types/login-platform";

import { CREDENTIAL_SERVICE } from "@src/credential/services/impl/credential.service.impl";
import { MEMBER_SERVICE } from "@src/member/services/impl/member.service.impl";
import CredentialService from "@src/credential/services/credential.service";
import MemberService from "@src/member/services/member.service";
import SignatureDto from "@src/common/dtos/signature.dto";

export const ACCESS_TOKEN_STRATEGY: string = "ACCESS_TOKEN_STRATEGY";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN_STRATEGY) {
  constructor(
    configService: ConfigService,
    @Inject(CREDENTIAL_SERVICE) private readonly credentialService: CredentialService,
    @Inject(MEMBER_SERVICE) private readonly memberService: MemberService,
  ) {
    super({
      secretOrKey: configService.get<string>("ACCESS_TOKEN_KEY"),
      issuer: configService.get<string>("JWT_ISSUER"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: AccessTokenPayload): Promise<number> {
    const { id, uuid, loginPlatform } = payload;

    const foundSignature: SignatureDto = await this.memberService.getSignature(id);
    const foundLoginPlatform: LoginPlatform = await this.credentialService.getLoginPlatform(id);

    if (id !== foundSignature.id || uuid !== foundSignature.uuid || loginPlatform !== foundLoginPlatform) {
      throw new UnauthorizedException(INVALID_AUTH_TOKEN);
    }

    return id;
  }
}
