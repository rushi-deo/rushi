import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CompanyScopeGuard } from '../../common/guards/company-scope.guard';
import { AccountingService } from './accounting.service';

@Controller({ path: 'accounting', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard, CompanyScopeGuard)
export class AccountingController {
  constructor(private readonly service: AccountingService) {}

  @RequirePermissions('accounting', 'create', 'approve')
  @Post('journal-entries')
  createJournal(@Body() body: any) { return this.service.createJournalEntry(body); }

  @RequirePermissions('accounting', 'read', 'export')
  @Get('reports/profit-loss')
  profitLoss() { return this.service.profitLoss(); }
}
