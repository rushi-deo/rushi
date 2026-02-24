import { Injectable } from '@nestjs/common';
@Injectable()
export class SalesService {
  listLeads(query: any) { return { module: 'sales.crm', query, items: [] }; }
  createQuotation(body: any) { return { module: 'sales.order', body, status: 'created' }; }
}
