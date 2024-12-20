import CreateMemberDto from "@src/member/dto/create-member.dto";
import SignatureDto from "@src/common/dto/member-signature.dto";

export default interface MemberService {
  createMember(identifier: string, createMemberDto: CreateMemberDto): Promise<void>;

  getSignature(id: number): Promise<SignatureDto>;

  getSignature(id: number): Promise<SignatureDto>;
}
