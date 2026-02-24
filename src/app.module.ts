import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuditModule } from './audit/audit.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { AuditMiddleware } from './common/middleware/audit.middleware';
import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { HrModule } from './modules/hr/hr.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { PosModule } from './modules/pos/pos.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ReportingModule } from './modules/reporting/reporting.module';
import { SalesModule } from './modules/sales/sales.module';
import { WebsiteModule } from './modules/website/website.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuditModule,
    AuthModule,
    UsersModule,
    CompaniesModule,
    SalesModule,
    AccountingModule,
    HrModule,
    MarketingModule,
    WebsiteModule,
    ProjectsModule,
    PosModule,
    DocumentsModule,
    ReportingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware, AuditMiddleware).forRoutes('*');
  }
}
