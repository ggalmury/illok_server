export const Visibility = {
  PRIVATE: "private",
  PUBLIC: "public",
  FRIEND_ONLY: "friend only",
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];
