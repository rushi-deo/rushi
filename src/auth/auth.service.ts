import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async login(payload: { email: string; password: string; ip: string; userAgent: string }) {
    const user = await this.prisma.user.findFirst({ where: { email: payload.email, deletedAt: null } });
    if (!user || !(await compare(payload.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokenPayload = { sub: user.id, role: user.role, companyId: user.companyId };
    const accessToken = this.jwtService.sign(tokenPayload);
    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
    });

    await this.prisma.loginHistory.create({
      data: { userId: user.id, ipAddress: payload.ip, userAgent: payload.userAgent },
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
    return { accessToken: this.jwtService.sign(payload) };
  }

  async googleOauth(_idToken: string) {
    return { message: 'Google OAuth token verification/linking endpoint ready' };
  }
}
