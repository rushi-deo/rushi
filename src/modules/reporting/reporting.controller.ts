import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CompanyScopeGuard } from '../../common/guards/company-scope.guard';
import { ReportingService } from './reporting.service';

@Controller({ path: 'reporting', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard, CompanyScopeGuard)
export class ReportingController {
  constructor(private readonly service: ReportingService) {}

  @RequirePermissions('reporting', 'read')
  @Get('dashboard')
  dashboard(@Query('companyId') companyId?: string) { return this.service.dashboard(companyId); }

  @RequirePermissions('reporting', 'export')
  @Get('export/csv')
  exportCsv() { return this.service.exportCsv(); }
}
