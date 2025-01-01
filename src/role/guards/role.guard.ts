import { Request } from "express";
import { Injectable, Inject, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { ROLES_KEY } from "@src/role/decorators/roles";
import { Role } from "@src/role/types/role";

import { ROLE_SERVICE } from "@src/role/services/impl/role.service.impl";
import RoleService from "@src/role/services/role.service";

@Injectable()
export default class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(ROLE_SERVICE) private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles: Role[] = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const memberId: number = request.user as number;

    return await this.roleService.hasRoles(memberId, requiredRoles);
  }
}
