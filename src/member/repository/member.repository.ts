import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import MemberEntity from "@src/member/entity/member.entity";

@Injectable()
export default class MemberRepository extends Repository<MemberEntity> {
  constructor(dataSource: DataSource) {
    super(MemberEntity, dataSource.createEntityManager());
  }

  async findOneById(id: number): Promise<MemberEntity | null> {
    return await this.findOne({ where: { id } });
  }
}
