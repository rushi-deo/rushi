import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CompanyScopeGuard } from '../../common/guards/company-scope.guard';
import { SalesService } from './sales.service';

@Controller({ path: 'sales', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard, CompanyScopeGuard)
export class SalesController {
  constructor(private readonly service: SalesService) {}

  @RequirePermissions('sales', 'read')
  @Get('leads')
  leads(@Query() query: any) { return this.service.listLeads(query); }

  @RequirePermissions('sales', 'create')
  @Post('quotations')
  createQuotation(@Body() body: any) { return this.service.createQuotation(body); }
}
