import { Injectable } from '@nestjs/common';
@Injectable()
export class WebsiteService {
  createProduct(body: any) { return { module: 'website', product: body }; }
  checkoutConfig() { return { module: 'ecommerce', paymentReady: true }; }
}
