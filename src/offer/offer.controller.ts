import { Controller, Get } from '@nestjs/common';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get()
  fetchOffers() {
    return this.offerService.fetchOffers();
  }
}
