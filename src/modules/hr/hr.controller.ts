import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CompanyScopeGuard } from '../../common/guards/company-scope.guard';
import { HrService } from './hr.service';

@Controller({ path: 'hr', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard, CompanyScopeGuard)
export class HrController {
  constructor(private readonly service: HrService) {}

  @RequirePermissions('hr', 'create')
  @Post('employees')
  createEmployee(@Body() body: any) { return this.service.createEmployee(body); }

  @RequirePermissions('hr', 'read')
  @Get('payslips/me')
  myPayslips() { return this.service.myPayslips(); }
}
