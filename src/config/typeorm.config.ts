import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import SnakeNamingStrategy from "typeorm-naming-strategy";

@Injectable()
export default class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.configService.get<string>("DB_HOST"),
      port: this.configService.get<number>("DB_PORT", 3306),
      username: this.configService.get<string>("DB_USERNAME"),
      password: this.configService.get<string>("DB_PASSWORD"),
      database: this.configService.get<string>("DB_DATABASE"),
      synchronize: this.configService.get<boolean>("DB_SYNCHRONIZE", false),
      namingStrategy: new SnakeNamingStrategy(),
      charset: "utf8mb4",
      timezone: "Z",
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    };
  }
}
