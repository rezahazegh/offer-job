import { Injectable, Logger } from '@nestjs/common';
import { payload as payload1 } from '../../payload/offer1.payload';
import { payload as payload2 } from '../../payload/offer2.payload';
import {
  instanceToPlain,
  plainToClass,
  plainToInstance,
} from 'class-transformer';
import { Provider } from './enum/provider.enum';
import { OfferDtoFactory } from './dto/offer-dto.factory';
import { validate } from 'class-validator';
import { OfferValidatorDto } from './dto/offer-validator.dto';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);

  constructor() {}

  async fetchOffers() {
    const providers: Provider[] = this.getListOfActiveProviders();

    const offerList = [];
    for (const provider of providers) {
      const payload = this.fetchData(provider);
      const offerListSerialized = this.serializePayloadToOfferList(
        provider,
        payload,
      );
      const offerListValidated = await this.validateSerializedOfferList(
        offerListSerialized.offerList,
      );

      offerList.push(...offerListValidated);
      // save on db
    }

    return offerList;
  }
  private getListOfActiveProviders(): Provider[] {
    return Object.values(Provider);
  }
  private fetchData(provider: Provider) {
    switch (provider) {
      case Provider.Offer1:
        return payload1;
      case Provider.Offer2:
        return payload2;
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
}
