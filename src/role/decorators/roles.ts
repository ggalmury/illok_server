import { SetMetadata } from "@nestjs/common";

import { Role } from "@src/role/types/role";

export const ROLES_KEY: string = "ROLES_KEY";

const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export default Roles;
