import { LoginPlatform } from "@src/member/type/login-platform";

export interface TokenPayload {
  id: number;
  uuid: string;
}

export interface AccessTokenPayload extends TokenPayload {
  loginPlatform: LoginPlatform;
}

export interface RefreshTokenPayload extends TokenPayload {}
