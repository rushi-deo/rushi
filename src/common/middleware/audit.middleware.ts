import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', async () => {
      if (req.path.startsWith('/docs')) return;
      await this.prisma.auditLog.create({
        data: {
          actorId: (req as any).user?.sub || null,
          action: `${req.method} ${req.path}`,
          module: req.path.split('/')[3] || 'core',
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'] || null,
          companyId: (req as any).user?.companyId || null,
          metadata: {
            statusCode: res.statusCode,
            query: req.query,
          },
        },
      });
    });

    next();
  }
}
