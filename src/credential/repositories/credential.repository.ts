import CredentialEntity from "@src/credential/entities/credential.entity";

export default interface CredentialRepository {
  save(entity: CredentialEntity): Promise<CredentialEntity>;

  findOneByMemberId(memberId: number): Promise<CredentialEntity | null>;

  findOneByIdentifier(identifier: string): Promise<CredentialEntity | null>;

  softDeleteByMemberId(memberId: number): Promise<void>;

  deleteByMemberId(memberId: number): Promise<void>;
}
