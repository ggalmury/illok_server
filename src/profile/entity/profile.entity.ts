import { Column, Entity, OneToOne } from "typeorm";

import { introductionLength, nameLength } from "@src/profile/constant/constraint";

import SignatureEntity from "@src/common/entity/signature.entity";
import MemberEntity from "@src/member/entity/member.entity";

@Entity({ name: "profiles" })
export default class ProfileEntity extends SignatureEntity {
  @Column({ type: "varchar", length: nameLength })
  name: string;

  @Column({ type: "varchar", nullable: true, length: introductionLength })
  introduction: string | null;

  @OneToOne(() => MemberEntity, (member) => member.role)
  member: MemberEntity;
}
