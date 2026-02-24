import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CompanyScopeGuard } from '../../common/guards/company-scope.guard';
import { MarketingService } from './marketing.service';

@Controller({ path: 'marketing', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard, CompanyScopeGuard)
export class MarketingController {
  constructor(private readonly service: MarketingService) {}

  @RequirePermissions('marketing', 'create')
  @Post('campaigns')
  createCampaign(@Body() body: any) { return this.service.createCampaign(body); }

  @RequirePermissions('marketing', 'read')
  @Get('analytics')
  analytics() { return this.service.analytics(); }
}
