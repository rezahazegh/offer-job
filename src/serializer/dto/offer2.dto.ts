import { IOffer } from '../../offer/interface/offer.interface';
import {
  Expose,
  instanceToPlain,
  plainToClass,
  plainToInstance,
  Type,
} from 'class-transformer';
import { IOfferDto } from '../../offer/interface/offer-dto.interface';

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

  // offer name
  @Expose()
  get name() {
    return this.Offer.name;
  }

  // offer description
  @Expose()
  get description() {
    return this.Offer.description;
  }

  // offer requirements
  @Expose()
  get requirements() {
    return this.Offer.instructions;
  }

  // offer thumbnail image url
  @Expose()
  get thumbnail() {
    return this.Offer.icon;
  }

  // indicates if offer is available for desktop
  @Expose()
  get isDesktop() {
    return this.OS.web ? 1 : 0;
  }

  // indicates if offer is available for android
  @Expose()
  get isAndroid() {
    return this.OS.android ? 1 : 0;
  }

  // indicates if offer is available for ios
  @Expose()
  get isIos() {
    return this.OS.ios ? 1 : 0;
  }

  // offer url template
  @Expose()
  get offerUrlTemplate() {
    return this.Offer.tracking_url;
  }

  // provider name - this should be static for each offer type
  // we're attaching two offer payloads - offer1, offer2
  // so for offer1 payload, this should be "offer1"
  // for offer2 payload, this should be "offer2"
  @Expose()
  get providerName() {
    return 'offer2';
  }

  // offer id from external provider
  @Expose()
  get externalOfferId() {
    return this.Offer.campaign_id.toString();
  }
}

export class Offer2Dto implements IOfferDto {
  data: any;

  @Expose()
  get offerList(): Partial<IOffer>[] {
    const offerArray = [];

    for (const item in this.data) {
      const offerClass = plainToInstance(Offer, this.data[item]);
      const offerSer = instanceToPlain(offerClass, {
        excludeExtraneousValues: true,
      });
      offerArray.push(offerSer);
    }

    return offerArray;
  }
}
