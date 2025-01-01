import MemberEntity from "@src/member/entities/member.entity";
import CreateMemberDto from "@src/member/dtos/create-member.dto";
import SignatureDto from "@src/common/dtos/signature.dto";

export default interface MemberService {
  createMember(createMemberDto: CreateMemberDto): MemberEntity;

  saveMember(entity: MemberEntity): Promise<MemberEntity>;

  getSignature(id: number): Promise<SignatureDto>;
}
