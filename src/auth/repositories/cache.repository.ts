import { Cache } from "cache-manager";

export default interface CacheRepository {
  readonly cacheManager: Cache;
  readonly ttl: number;

  key(id: number): string;
}
