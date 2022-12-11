import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from 'src/enums/permission.enum';
import { PERMISSIONS_KEY } from './require-permissions.decorator';

@Injectable()
export class RequirePermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requirePermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requirePermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requirePermissions.some((permission) =>
      user.permissions?.includes(permission),
    );
  }
}
