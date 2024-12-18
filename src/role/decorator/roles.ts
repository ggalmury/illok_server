import { SetMetadata } from "@nestjs/common";

import { Role } from "@src/role/type/role";

export const ROLES_KEY = "ROLES_KEY";

const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export default Roles;
