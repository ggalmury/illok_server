import ProfileEntity from "@src/profile/entities/profile.entity";
import CreateProfileDto from "@src/profile/dtos/create-profile.dto";
import UpdateProfileDto from "@src/profile/dtos/update-profile.dto";

export default interface ProfileService {
  createProfile(createProfileDto: CreateProfileDto): ProfileEntity;

  saveProfile(entity: ProfileEntity): Promise<ProfileEntity>;

  updateProfile(memberId: number, updateProfileDto: UpdateProfileDto): Promise<ProfileEntity>;

  hasProfile(memberId: number): Promise<boolean>;

  softDeleteProfile(memberId: number): Promise<void>;

  deleteProfile(memberId: number): Promise<void>;
}
