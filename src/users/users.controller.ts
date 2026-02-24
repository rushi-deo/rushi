import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CompanyScopeGuard } from '../common/guards/company-scope.guard';
import { UsersService } from './users.service';

@Controller({ path: 'users', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard, CompanyScopeGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('SUPER_ADMIN', 'COMPANY_ADMIN')
  @Post()
  createUser(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Roles('SUPER_ADMIN')
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.softDelete(id);
  }

  @Roles('SUPER_ADMIN')
  @Get()
  listUsers() {
    return this.usersService.list();
  }
}
