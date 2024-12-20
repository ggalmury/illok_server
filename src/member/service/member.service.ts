import SignatureDto from "@src/common/dto/member-signature.dto";

export default interface MemberService {
  getSignature(id: number): Promise<SignatureDto>;
}
