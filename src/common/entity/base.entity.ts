import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";

import { INVALID_UUID } from "@src/common/constant/exception-message";
import { generateReorderedUuidV1, uuidToBinary, binaryToUuid, validateUuid } from "@src/common/helper/uuid";

export default abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

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

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date | null;

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
