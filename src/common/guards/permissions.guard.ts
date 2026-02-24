import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const config = this.reflector.getAllAndOverride<{ module: string; actions: string[] }>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!config) return true;

    const user = context.switchToHttp().getRequest().user;
    if (user?.role === 'SUPER_ADMIN') return true;

    const allowed = (user?.permissions || []).filter((p: any) => p.module === config.module);
    const allAllowed = config.actions.every((action) => allowed.some((p: any) => p.action === action));
    if (!allAllowed) throw new ForbiddenException('Permission denied');
    return true;
  }
}
