import ProfileEntity from "@src/profile/entities/profile.entity";

export default interface ProfileRepository {
  save(entity: ProfileEntity): Promise<ProfileEntity>;

  findOneByMemberId(memberId: number): Promise<ProfileEntity | null>;

  softDeleteByMemberId(memberId: number): Promise<void>;

  deleteByMemberId(memberId: number): Promise<void>;
}
