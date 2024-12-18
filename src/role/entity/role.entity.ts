import { Entity, Column, ManyToOne } from "typeorm";

import { Role } from "@src/role/type/role";

import BaseEntity from "@src/common/entity/base.entity";
import MemberEntity from "@src/member/entity/member.entity";

@Entity({ name: "roles" })
export default class RoleEntity extends BaseEntity {
  @Column({ type: "varchar" })
  role: Role;

  @ManyToOne(() => MemberEntity, (member) => member.role)
  member: MemberEntity;
}
