import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  create(body: { name: string; baseCurrency: string }) {
    return this.prisma.company.create({ data: body });
  }

  softDelete(id: string) {
    return this.prisma.company.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  list() {
    return this.prisma.company.findMany({ where: { deletedAt: null } });
  }
}
