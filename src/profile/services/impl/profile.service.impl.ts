import { Injectable, Inject, NotFoundException } from "@nestjs/common";

import { PROFILE_NOT_FOUND } from "@src/profile/constants/exception-message";

import { PROFILE_REPOSITORY } from "@src/profile/repositories/impl/profile.repository.impl";
import ProfileService from "@src/profile/services/profile.service";
import ProfileRepository from "@src/profile/repositories/profile.repository";
import ProfileMapper from "@src/profile/mappers/profile.mapper";
import ProfileEntity from "@src/profile/entities/profile.entity";
import CreateProfileDto from "@src/profile/dtos/create-profile.dto";
import UpdateProfileDto from "@src/profile/dtos/update-profile.dto";

export const PROFILE_SERVICE: string = "PROFILE_SERVICE";

@Injectable()
export default class ProfileServiceImpl implements ProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY) private readonly profileRepository: ProfileRepository,
    private readonly profileMapper: ProfileMapper,
  ) {}

  createProfile(createProfileDto: CreateProfileDto): ProfileEntity {
    return this.profileMapper.createDtoToEntity(createProfileDto);
  }

  async saveProfile(entity: ProfileEntity): Promise<ProfileEntity> {
    return await this.profileRepository.save(entity);
  }

  async updateProfile(memberId: number, updateProfileDto: UpdateProfileDto): Promise<ProfileEntity> {
    const foundedProfile: ProfileEntity | null = await this.profileRepository.findOneByMemberId(memberId);
    if (!foundedProfile) {
      throw new NotFoundException(PROFILE_NOT_FOUND);
    }

    const profileToUpdate: ProfileEntity = this.profileMapper.updateDtoToEntity(updateProfileDto, foundedProfile);

    return await this.profileRepository.save(profileToUpdate);
  }

  async hasProfile(memberId: number): Promise<boolean> {
    const foundedProfile: ProfileEntity | null = await this.profileRepository.findOneByMemberId(memberId);

    return foundedProfile ? true : false;
  }

  async softDeleteProfile(memberId: number): Promise<void> {
    await this.profileRepository.softDeleteByMemberId(memberId);
  }

  async deleteProfile(memberId: number): Promise<void> {
    await this.profileRepository.deleteByMemberId(memberId);
  }
}
