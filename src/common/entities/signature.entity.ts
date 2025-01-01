import { Column, BeforeInsert } from "typeorm";

import { generateReorderedUuidV1, uuidToBinary, binaryToUuid } from "@src/common/helpers/uuid";

import BaseEntity from "@src/common/entities/base.entity";

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
  }
}
