export const LoginPlatform = {
  KAKAO: "kakao",
  GOOGLE: "google",
  EMAIL: "email",
} as const;

export type LoginPlatform = (typeof LoginPlatform)[keyof typeof LoginPlatform];
