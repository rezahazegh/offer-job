import { Provider } from '../../provider/enum/provider.enum';
import { Offer1Dto } from './offer1.dto';
import { Offer2Dto } from './offer2.dto';

export class OfferDtoFactory {
  static getDto(provider: Provider): any {
    switch (provider) {
      case Provider.Offer1:
        return Offer1Dto;
      case Provider.Offer2:
        return Offer2Dto;
    }
  }
}
