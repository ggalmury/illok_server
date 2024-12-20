import { ConflictException, Injectable } from "@nestjs/common";

import { PROFILE_CONFLICT } from "@src/profile/constant/exception-message";

import ProfileService from "@src/profile/service/profile.service";
import ProfileRepository from "@src/profile/repository/profile.repository";
import ProfileMapper from "@src/profile/mapper/profile.mapper";
import ProfileEntity from "@src/profile/entity/profile.entity";
import CreateProfileDto from "@src/profile/dto/create-profile.dto";

export const PROFILE_SERVICE: string = "PROFILE_SERVICE";

@Injectable()
export default class ProfileServiceImpl implements ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly profileMapper: ProfileMapper,
  ) {}

  async createProfile(memberId: number, createProfileDto: CreateProfileDto): Promise<void> {
    const foundProfile: ProfileEntity | null = await this.profileRepository.findOneByMemberId(memberId);
    if (foundProfile) {
      throw new ConflictException(PROFILE_CONFLICT);
    }

    const createdProfile: ProfileEntity = this.profileMapper.createDtoToEntity(memberId, createProfileDto);

    await this.profileRepository.insert(createdProfile);
  }
}
