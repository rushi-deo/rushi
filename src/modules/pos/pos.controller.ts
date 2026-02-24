import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CompanyScopeGuard } from '../../common/guards/company-scope.guard';
import { PosService } from './pos.service';

@Controller({ path: 'pos', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard, CompanyScopeGuard)
export class PosController {
  constructor(private readonly service: PosService) {}

  @RequirePermissions('pos', 'create')
  @Post('sessions')
  startSession(@Body() body: any) { return this.service.startSession(body); }

  @RequirePermissions('pos', 'read')
  @Get('reports/daily')
  dailySummary() { return this.service.dailySummary(); }
}
