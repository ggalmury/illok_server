import { Column, BeforeInsert } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";

import { INVALID_UUID } from "@src/common/constant/exception-message";
import { generateReorderedUuidV1, uuidToBinary, binaryToUuid, validateUuid } from "@src/common/helper/uuid";

import BaseEntity from "@src/common/entity/base.entity";

export default abstract class SignatureEntity extends BaseEntity {
  @Column({
    type: "binary",
    length: 16,
    unique: true,
    transformer: {
      to(value: string): Buffer {
        return uuidToBinary(value);
      },
      from(value: Buffer): string {
        return binaryToUuid(value);
      },
    },
  })
  uuid: string;

  @BeforeInsert()
  generateUuid() {
    if (!this.uuid) {
      this.uuid = generateReorderedUuidV1();
    }

    if (!validateUuid(this.uuid)) {
      throw new InternalServerErrorException(INVALID_UUID);
    }
  }
}
