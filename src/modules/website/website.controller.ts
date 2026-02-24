import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CompanyScopeGuard } from '../../common/guards/company-scope.guard';
import { WebsiteService } from './website.service';

@Controller({ path: 'website', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard, CompanyScopeGuard)
export class WebsiteController {
  constructor(private readonly service: WebsiteService) {}

  @RequirePermissions('website', 'create')
  @Post('products')
  createProduct(@Body() body: any) { return this.service.createProduct(body); }

  @RequirePermissions('website', 'read')
  @Get('checkout')
  checkoutConfig() { return this.service.checkoutConfig(); }
}
