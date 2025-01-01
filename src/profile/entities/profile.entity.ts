import { Column, Entity, OneToOne, RelationId } from "typeorm";

import { introductionLength, nameLength } from "@src/profile/constants/constraint";

import SignatureEntity from "@src/common/entities/signature.entity";
import MemberEntity from "@src/member/entities/member.entity";

@Entity({ name: "profiles" })
export default class ProfileEntity extends SignatureEntity {
  @Column({ type: "varchar", length: nameLength })
  name: string;

  @Column({ type: "varchar", nullable: true, length: introductionLength })
  introduction: string | null;

  @OneToOne(() => MemberEntity, (member) => member.roles)
  member: MemberEntity;

  @RelationId((profile: ProfileEntity) => profile.member)
  memberId: number;
}
