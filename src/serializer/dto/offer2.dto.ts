import { IOffer } from '../../offer/interface/offer.interface';
import { Expose, instanceToPlain, plainToInstance } from 'class-transformer';
import { IOfferDto } from '../interface/offer-dto.interface';
import { Provider } from '../../provider/enum/provider.enum';

class OfferPart {
  name: string;
  description: string;
  instructions: string;
  icon: string;
  tracking_url: string;
  campaign_id: number;
}
class OSPart {
  web: boolean;
  android: boolean;
  ios: boolean;
}
export class Offer implements Omit<IOffer, 'slug'> {
  Offer: OfferPart;
  OS: OSPart;

  @Expose()
  get name() {
    return this.Offer.name;
  }

  @Expose()
  get description() {
    return this.Offer.description;
  }

  @Expose()
  get requirements() {
    return this.Offer.instructions;
  }

  @Expose()
  get thumbnail() {
    return this.Offer.icon;
  }

  @Expose()
  get isDesktop() {
    return this.OS.web ? 1 : 0;
  }

  @Expose()
  get isAndroid() {
    return this.OS.android ? 1 : 0;
  }

  @Expose()
  get isIos() {
    return this.OS.ios ? 1 : 0;
  }

  // offer url template
  @Expose()
  get offerUrlTemplate() {
    return this.Offer.tracking_url;
  }

  @Expose()
  get providerName() {
    return Provider.Offer2;
  }

  // offer id from external provider
  @Expose()
  get externalOfferId() {
    return this.Offer?.campaign_id.toString();
  }
}
export class Offer2Dto implements IOfferDto {
  data: any;

  @Expose()
  get offerList(): Partial<IOffer>[] {
    const offerList = [];

    for (const item in this.data) {
      const offerClass = plainToInstance(Offer, this.data[item]);
      const offerSerialized = instanceToPlain(offerClass, {
        excludeExtraneousValues: true,
      });
      offerList.push(offerSerialized);
    }

    return offerList;
  }
}
