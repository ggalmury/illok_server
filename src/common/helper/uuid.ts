import { v1 } from "uuid";

export const generateReorderedUuidV1 = (): string => {
  const uuid: string = v1();
  const uuidParts: string[] = uuid.split("-");

  return `${uuidParts[2]}-${uuidParts[1]}-${uuidParts[0]}-${uuidParts[3]}-${uuidParts[4]}`;
};

export const uuidToBinary = (uuid: string): Buffer => {
  return Buffer.from(uuid.replace(/-/g, ""), "hex");
};

export const binaryToUuid = (buffer: Buffer): string => {
  const hex: string = buffer.toString("hex");

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

export const validateUuid = (uuid: string): boolean => {
  const regex: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return regex.test(uuid);
};
