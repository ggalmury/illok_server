import { Module, InternalServerErrorException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "@nestjs/cache-manager";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

import TypeOrmConfig from "@src/config/typeorm.config";
import redisConfig from "@src/config/redis.config";

import AuthModule from "@src/auth/auth.module";
import MemberModule from "@src/member/member.module";
import ProfileModule from "@src/profile/profile.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === "production" ? ".env" : ".env.dev",
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig,
      async dataSourceFactory(options) {
        if (!options) {
          throw new InternalServerErrorException("transaction datasource 주입 실패");
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    CacheModule.register({
      redisConfig,
      isGlobal: true,
    }),
    AuthModule,
    MemberModule,

    ProfileModule,
  ],
})
export class AppModule {}
