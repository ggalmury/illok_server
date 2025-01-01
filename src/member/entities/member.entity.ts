import { Entity, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";

import { Visibility } from "@src/member/types/visibility";

import SignatureEntity from "@src/common/entities/signature.entity";
import CredentialEntity from "@src/credential/entities/credential.entity";
import RoleEntity from "@src/role/entities/role.entity";
import ProfileEntity from "@src/profile/entities/profile.entity";

@Entity({ name: "members" })
export default class MemberEntity extends SignatureEntity {
  @Column({ type: "enum", enum: Object.values(Visibility), default: Visibility.PUBLIC })
  visibility: Visibility;

  @OneToOne(() => CredentialEntity, (credential) => credential.member)
  @JoinColumn()
  credential: CredentialEntity;

  @OneToMany(() => RoleEntity, (role) => role.member)
  roles: RoleEntity[];

  @OneToOne(() => ProfileEntity, (profile) => profile.member)
  @JoinColumn()
  profile: ProfileEntity;
}
