import { Injectable } from "@nestjs/common";

import ProfileService from "@src/profile/service/profile.service";
import ProfileRepository from "@src/profile/repository/profile.repository";
import ProfileMapper from "@src/profile/mapper/profile.mapper";

export const PROFILE_SERVICE: string = "PROFILE_SERVICE";

@Injectable()
export default class ProfileServiceImpl implements ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly profileMapper: ProfileMapper,
  ) {}
}
