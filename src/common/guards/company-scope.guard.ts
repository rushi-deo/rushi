import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class CompanyScopeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (user?.role === 'SUPER_ADMIN') return true;

    const companyId = req.params.companyId || req.body.companyId || req.query.companyId;
    if (companyId && companyId !== user?.companyId) {
      throw new ForbiddenException('Cross-company access forbidden');
    }

    req.companyScopeId = user?.companyId;
    return true;
  }
}
