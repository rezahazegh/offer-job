import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OfferValidatorDto } from './dto/offer-validator.dto';
import { validate } from 'class-validator';
import { IOffer } from '../offer/interface/offer.interface';

@Injectable()
export class ValidatorService {
  private readonly logger = new Logger(ValidatorService.name);

  async validateSerializedOfferList(offerList: IOffer[]): Promise<IOffer[]> {
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
