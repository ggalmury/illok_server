import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

import CacheRepository from "@src/auth/repository/cache.repository";

@Injectable()
export default class RefreshTokenRepository implements CacheRepository {
  readonly cacheManager: Cache;
  readonly ttl: number;

  constructor(@Inject(CACHE_MANAGER) cacheManager: Cache) {
    this.cacheManager = cacheManager;
    this.ttl = 604800000;
  }

  key(id: number): string {
    return `refresh_token_${id.toString()}`;
  }

  async setToken(id: number, token: string): Promise<void> {
    const key: string = this.key(id);

    await this.cacheManager.set(key, token, this.ttl);
  }

  async getToken(id: number): Promise<string | null> {
    const key: string = this.key(id);
    const token: string = await this.cacheManager.get<string>(key);
    if (!token) {
      return null;
    }

    return token;
  }

  async deleteToken(id: number): Promise<void> {
    const key: string = this.key(id);

    await this.cacheManager.del(key);
  }
}
