import MemberEntity from "@src/member/entities/member.entity";

export default interface MemberRepository {
  save(entity: MemberEntity): Promise<MemberEntity>;

  findOneById(id: number): Promise<MemberEntity | null>;
}
