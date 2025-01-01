import { Entity, Column, OneToOne, RelationId } from "typeorm";

import { LoginPlatform } from "@src/member/types/login-platform";

import BaseEntity from "@src/common/entities/base.entity";
import MemberEntity from "@src/member/entities/member.entity";

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

  @RelationId((credential: CredentialEntity) => credential.member)
  memberId: number;
}
