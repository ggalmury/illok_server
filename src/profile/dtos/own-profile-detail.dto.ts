import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class OwnProfileDetailDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly introduction: string | null;

  constructor(name: string, introduction: string | null) {
    this.name = name;
    this.introduction = introduction;
  }
}
