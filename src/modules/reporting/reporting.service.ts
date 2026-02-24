import { Injectable } from '@nestjs/common';
@Injectable()
export class ReportingService {
  dashboard(companyId?: string) { return { module: 'reporting', companyId, widgets: [] }; }
  exportCsv() { return { module: 'reporting', format: 'csv', status: 'ready' }; }
}
