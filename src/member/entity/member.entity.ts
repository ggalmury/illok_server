import { Entity, Column, OneToMany } from "typeorm";

import { LoginPlatform } from "@src/member/type/login-platform";

import BaseEntity from "@src/common/entity/base.entity";
import RoleEntity from "@src/role/entity/role.entity";

@Entity({ name: "members" })
export default class MemberEntity extends BaseEntity {
  @Column({ type: "varchar", unique: true })
  identifier: string;

  @Column({ type: "varchar", nullable: true })
  password: string | null;

  @Column({ type: "varchar" })
  loginPlatform: LoginPlatform;

  @OneToMany(() => RoleEntity, (role) => role.member)
  role: RoleEntity[];
}
