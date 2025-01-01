import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import MemberRepository from "@src/member/repositories/member.repository";
import MemberEntity from "@src/member/entities/member.entity";

export const MEMBER_REPOSITORY: string = "MEMBER_REPOSITORY";

@Injectable()
export default class MemberRepositoryImpl implements MemberRepository {
  constructor(@InjectRepository(MemberEntity) private readonly repository: Repository<MemberEntity>) {}

  async save(entity: MemberEntity): Promise<MemberEntity> {
    return await this.repository.save(entity);
  }

  async findOneById(id: number): Promise<MemberEntity | null> {
    return await this.repository.findOne({ where: { id } });
  }
}
