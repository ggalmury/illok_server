import { Injectable } from "@nestjs/common";
import ProfileEntity from "../entity/profile.entity";
import CreateProfileDto from "../dto/create-profile.dto";

@Injectable()
export default class ProfileMapper {
  createDtoToEntity(memberId: number, createDto: CreateProfileDto): ProfileEntity {
    const { name, introduction } = createDto;

    const entity: ProfileEntity = new ProfileEntity();
    entity.member.id = memberId;
    entity.name = name;
    entity.introduction = introduction;

    return entity;
  }
}
