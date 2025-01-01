import { Injectable } from "@nestjs/common";

import ProfileEntity from "@src/profile/entities/profile.entity";
import CreateProfileDto from "@src/profile/dtos/create-profile.dto";
import UpdateProfileDto from "@src/profile/dtos/update-profile.dto";

@Injectable()
export default class ProfileMapper {
  createDtoToEntity(createDto: CreateProfileDto): ProfileEntity {
    const { name, introduction } = createDto;

    const entity: ProfileEntity = new ProfileEntity();
    entity.name = name;
    entity.introduction = introduction;

    return entity;
  }

  updateDtoToEntity(updateDto: UpdateProfileDto, original: ProfileEntity): ProfileEntity {
    const { name, introduction } = updateDto;

    const entity: ProfileEntity = original;
    entity.name = name;
    entity.introduction = introduction;

    return entity;
  }
}
