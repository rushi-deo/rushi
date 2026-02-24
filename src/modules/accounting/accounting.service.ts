import { Injectable } from '@nestjs/common';
@Injectable()
export class AccountingService {
  createJournalEntry(body: any) { return { module: 'accounting', body, immutableAudit: true }; }
  profitLoss() { return { module: 'accounting', report: 'profit_loss', rows: [] }; }
}
