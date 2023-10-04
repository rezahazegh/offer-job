import { Injectable, Logger } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Provider } from './enum/provider.enum';
import { OfferDtoFactory } from './dto/offer-dto.factory';
import { validate } from 'class-validator';
import { OfferValidatorDto } from './dto/offer-validator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entity/offer.entity';
import { Repository } from 'typeorm';
import { IOffer } from './interface/offer.interface';
import { ProviderService } from '../provider/provider.service';

@Injectable()
export class OfferService {
  private readonly logger = new Logger(OfferService.name);

  constructor(
    private readonly providerService: ProviderService,
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  async fetchOffers() {
    const providers: Provider[] =
      this.providerService.getListOfActiveProviders();

    for (const provider of providers) {
      const payload = this.providerService.fetchData(provider);
      const offerListSerialized = this.serializePayloadToOfferList(
        provider,
        payload,
      );
      const offerListValidated = await this.validateSerializedOfferList(
        offerListSerialized.offerList,
      );

      await this.saveOffers(offerListValidated);
    }
  }

  private serializePayloadToOfferList(provider: Provider, payload) {
    const offerDto = OfferDtoFactory.getDto(provider);
    const offerListClass = plainToInstance(offerDto, payload);
    const offerListSerialized = instanceToPlain(offerListClass, {
      excludeExtraneousValues: true,
    });
    return offerListSerialized;
  }
  private async validateSerializedOfferList(offerList) {
    const offerListValidationPromises = offerList.map((offer) => {
      const offerClass = plainToInstance(OfferValidatorDto, offer);
      return validate(offerClass);
    });

    const offerListValidationSettled = await Promise.all(
      offerListValidationPromises,
    );

    const offerListValidated = offerListValidationSettled
      .map((errors, index) => {
        if (errors.length > 0) {
          this.logSkippedOffer(errors, offerList[index]);
        } else {
          return offerList[index];
        }
      })
      .filter((item) => item !== undefined);

    return offerListValidated;
  }
  private logSkippedOffer(errors, offer) {
    this.logger.warn(
      `\n---------------------------------------------\n** Validation Error - The following offer skipped:\n ${JSON.stringify(
        offer,
      )}\n** Rejected fields:\n${errors.map(({ property }) => property)}`,
    );
  }

  private async saveOffers(offers: IOffer[]) {
    const offerEntityPromiseList = offers.map((offer) => {
      const offerEntity = new Offer(offer);
      return this.offerRepository.save(offerEntity);
    });
    await Promise.allSettled(offerEntityPromiseList);
  }
}
