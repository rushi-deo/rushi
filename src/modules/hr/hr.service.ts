import { Injectable } from '@nestjs/common';
@Injectable()
export class HrService {
  createEmployee(body: any) { return { module: 'hr', employee: body }; }
  myPayslips() { return { module: 'hr', payslips: [] }; }
}
