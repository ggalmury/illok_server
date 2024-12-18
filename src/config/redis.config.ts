import { CacheModuleOptions } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-ioredis";

const redisConfig: CacheModuleOptions = {
  store: redisStore,
  host: "localhost",
  port: 6379,
};

export default redisConfig;
