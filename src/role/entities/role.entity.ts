import { Entity, Column, ManyToOne, RelationId } from "typeorm";

import { Role } from "@src/role/types/role";

import BaseEntity from "@src/common/entities/base.entity";
import MemberEntity from "@src/member/entities/member.entity";

@Entity({ name: "roles" })
export default class RoleEntity extends BaseEntity {
  @Column({ type: "varchar" })
  role: Role;

  @ManyToOne(() => MemberEntity, (member) => member.roles)
  member: MemberEntity;

  @RelationId((role: RoleEntity) => role.member)
  memberId: number;
}
