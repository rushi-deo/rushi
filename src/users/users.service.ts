import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: any) {
    if (body.role === 'SUPER_ADMIN') {
      const existing = await this.prisma.user.count({ where: { role: 'SUPER_ADMIN', deletedAt: null } });
      if (existing > 0) throw new ConflictException('Only one Super Admin allowed');
    }

    return this.prisma.user.create({
      data: {
        email: body.email,
        passwordHash: await hash(body.password, 12),
        fullName: body.fullName,
        role: body.role,
        companyId: body.companyId || null,
      },
    });
  }

  async softDelete(id: string) {
    return this.prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async list() {
    return this.prisma.user.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } });
  }
}
