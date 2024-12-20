import { Entity, Column, OneToOne } from "typeorm";

import { LoginPlatform } from "@src/member/type/login-platform";

import BaseEntity from "@src/common/entity/base.entity";
import MemberEntity from "@src/member/entity/member.entity";

@Entity({ name: "credentials" })
export default class CredentialEntity extends BaseEntity {
  @Column({ type: "varchar", unique: true })
  identifier: string;

  @Column({ type: "varchar", nullable: true })
  password: string | null;

  @Column({ type: "varchar" })
  loginPlatform: LoginPlatform;

  @OneToOne(() => MemberEntity, (profile) => profile.credential)
  member: MemberEntity;
}
