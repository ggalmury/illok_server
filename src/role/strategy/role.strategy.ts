import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { ROLES_KEY } from "@src/role/decorator/roles";
import { Role } from "@src/role/type/role";

import CredentialDto from "@src/member/dto/credential.dto";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: Role[] = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const credentialDto: CredentialDto = request.user as CredentialDto;
    const memberRoles: Role[] = credentialDto.roles;

    return requiredRoles.some((role) => memberRoles.includes(role));
  }
}
