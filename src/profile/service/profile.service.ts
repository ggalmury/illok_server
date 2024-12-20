import CreateProfileDto from "@src/profile/dto/create-profile.dto";

export default interface ProfileService {
  createProfile(memberId: number, createMemberDto: CreateProfileDto): Promise<void>;
}
