import { Injectable, NestMiddleware, TooManyRequestsException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60000);
const maxRequests = Number(process.env.RATE_LIMIT_MAX || 120);
const buckets = new Map<string, { count: number; resetAt: number }>();

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const key = req.ip;
    const now = Date.now();
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt < now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    bucket.count += 1;
    if (bucket.count > maxRequests) throw new TooManyRequestsException('Rate limit exceeded');

    return next();
  }
}
