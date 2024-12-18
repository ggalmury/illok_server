import CredentialDto from "@src/member/dto/credential.dto";

export default interface MemberService {
  getMemberCredential(id: number): Promise<CredentialDto>;
}
