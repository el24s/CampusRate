import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '../enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {};

    canActivate(ctx: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [ctx.getHandler(), ctx.getClass()]);

        if(!roles) return true;

        const { user } = ctx.switchToHttp().getRequest();
        if (!roles.includes(user?.role)) {
            throw new ForbiddenException('Accès Refusé');
        }
        return true;
    }
}