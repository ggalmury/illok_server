import CacheRepository from "@src/auth/repositories/cache.repository";

export default interface TokenRepository extends CacheRepository {
  setToken(id: number, token: string): Promise<void>;

  getToken(id: number): Promise<string | null>;

  deleteToken(id: number): Promise<void>;
}
