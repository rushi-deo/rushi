import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuditService } from './audit.service';

@Controller({ path: 'audit-logs', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Roles('SUPER_ADMIN', 'AUDITOR')
  @Get()
  findAll(@Query('page') page = '1', @Query('limit') limit = '20') {
    return this.auditService.paginated(Number(page), Number(limit));
  }
}
