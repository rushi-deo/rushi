import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CompanyScopeGuard } from '../../common/guards/company-scope.guard';
import { DocumentsService } from './documents.service';

@Controller({ path: 'documents', version: '1' })
@UseGuards(JwtAuthGuard, PermissionsGuard, CompanyScopeGuard)
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @RequirePermissions('documents', 'create', 'approve')
  @Post('upload')
  upload(@Body() body: any) { return this.service.upload(body); }

  @RequirePermissions('documents', 'read')
  @Get('signed-url')
  signedUrl() { return this.service.signedUrl(); }
}
