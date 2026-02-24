import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CompanyScopeGuard } from '../../common/guards/company-scope.guard';
import { ProjectsService } from './projects.service';

@Controller({ path: 'projects', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard, CompanyScopeGuard)
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @RequirePermissions('projects', 'create')
  @Post()
  createProject(@Body() body: any) { return this.service.createProject(body); }

  @RequirePermissions('projects', 'read')
  @Get('gantt')
  gantt() { return this.service.gantt(); }
}
