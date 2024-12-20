import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class OwnProfileDetailDto {
  @IsNotEmpty()
  @IsString()
  readonly uuid: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly introduction: string | null;

  constructor(uuid: string, name: string, introduction: string | null) {
    this.uuid = uuid;
    this.name = name;
    this.introduction = introduction;
  }
}
