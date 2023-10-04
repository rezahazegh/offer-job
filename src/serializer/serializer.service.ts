import { Injectable } from '@nestjs/common';
import { Provider } from '../provider/enum/provider.enum';
import { OfferDtoFactory } from './dto/offer-dto.factory';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class SerializerService {
  serializePayloadToOfferList(provider: Provider, payload) {
    const offerDto = OfferDtoFactory.getDto(provider);
    const offerListClass = plainToInstance(offerDto, payload);
    const offerListSerialized = instanceToPlain(offerListClass, {
      excludeExtraneousValues: true,
    });
    return offerListSerialized;
  }
}
