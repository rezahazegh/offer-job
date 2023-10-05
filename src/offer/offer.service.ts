import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entity/offer.entity';
import { Repository } from 'typeorm';
import { IOffer } from './interface/offer.interface';
import { ProviderService } from '../provider/provider.service';
import { SerializerService } from '../serializer/serializer.service';
import { ValidatorService } from '../validator/validator.service';
import { SlugService } from './slug.service';

@Injectable()
export class OfferService {
  constructor(
    private readonly providerService: ProviderService,
    private readonly serializerService: SerializerService,
    private readonly validatorService: ValidatorService,
    private readonly slugService: SlugService,
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  async fetchOffers() {
    const providers = this.providerService.getListOfActiveProviders();

    for (const provider of providers) {
      const payload = this.providerService.fetchData(provider);

      const offerListSerialized =
        this.serializerService.serializePayloadToOfferList(provider, payload);

      const offerListValidated =
        await this.validatorService.validateSerializedOfferList(
          offerListSerialized,
        );

      const offers = await this.saveOffers(offerListValidated);

      await this.addSlugToOffers(offers);
    }
  }

  private async saveOffers(offers: IOffer[]): Promise<Offer[]> {
    const offerEntityPromiseList = offers.map((offer) => {
      const offerEntity = new Offer(offer);
      return this.offerRepository.save(offerEntity);
    });
    return Promise.all(offerEntityPromiseList);
  }

  private async addSlugToOffers(offers: Offer[]) {
    const offerEntityPromiseList = offers.map((offer) => {
      offer.slug = this.slugService.generateSlug(offer.id);
      return this.offerRepository.save(offer);
    });
    await Promise.all(offerEntityPromiseList);
  }
}
