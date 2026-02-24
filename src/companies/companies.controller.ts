import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CompanyScopeGuard } from '../common/guards/company-scope.guard';
import { CompaniesService } from './companies.service';

@Controller({ path: 'companies', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard, CompanyScopeGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Roles('SUPER_ADMIN')
  @Post()
  create(@Body() body: { name: string; baseCurrency: string }) {
    return this.companiesService.create(body);
  }

  @Roles('SUPER_ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.softDelete(id);
  }

  @Roles('SUPER_ADMIN')
  @Get()
  list() {
    return this.companiesService.list();
  }
}
