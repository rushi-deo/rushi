import { Injectable } from '@nestjs/common';
@Injectable()
export class PosService {
  startSession(body: any) { return { module: 'pos', session: body }; }
  dailySummary() { return { module: 'pos', summary: {} }; }
}
