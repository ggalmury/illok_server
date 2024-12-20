import { Entity, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";

import { Visibility } from "@src/member/type/visibility";

import SignatureEntity from "@src/common/entity/signature.entity";
import CredentialEntity from "@src/auth/entity/credential.entity";
import RoleEntity from "@src/auth/entity/role.entity";
import ProfileEntity from "@src/profile/entity/profile.entity";

@Entity({ name: "members" })
export default class MemberEntity extends SignatureEntity {
  @Column({ type: "enum", enum: Object.values(Visibility), default: Visibility.PUBLIC })
  visibility: Visibility;

  @OneToOne(() => CredentialEntity, (credential) => credential.member)
  @JoinColumn()
  credential: CredentialEntity;

  @OneToMany(() => RoleEntity, (role) => role.member)
  role: RoleEntity[];

  @OneToOne(() => ProfileEntity, (profile) => profile.member)
  @JoinColumn()
  profile: ProfileEntity;
}
