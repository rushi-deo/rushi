import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization as string | undefined;
    if (!auth?.startsWith('Bearer ')) throw new UnauthorizedException('Missing bearer token');

    const token = auth.replace('Bearer ', '');
    req.user = this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_SECRET });
    return true;
  }
}
