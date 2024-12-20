import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class SignatureDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly uuid: string;

  constructor(id: number, uuid: string) {
    this.id = id;
    this.uuid = uuid;
  }
}
