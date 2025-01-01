import { LoginPlatform } from "@src/member/types/login-platform";

export interface TokenPayload {
  id: number;
  uuid: string;
}

export interface AccessTokenPayload extends TokenPayload {
  loginPlatform: LoginPlatform;
}

export interface RefreshTokenPayload extends TokenPayload {}
