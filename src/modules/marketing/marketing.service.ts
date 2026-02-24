import { Injectable } from '@nestjs/common';
@Injectable()
export class MarketingService {
  createCampaign(body: any) { return { module: 'marketing', campaign: body }; }
  analytics() { return { module: 'marketing', conversion: [] }; }
}
