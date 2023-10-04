import { Expose, Type } from 'class-transformer';
import { IOffer } from '../../offer/interface/offer.interface';
import { IsString } from 'class-validator';
import { IOfferDto } from '../interface/offer-dto.interface';
import { Provider } from '../../provider/enum/provider.enum';

class Offer implements Omit<IOffer, 'slug'> {
  offer_name: string;
  @Expose()
  get name() {
    return this.offer_name;
  }

  offer_desc: string;
  @Expose()
  get description() {
    return this.offer_desc;
  }

  call_to_action: string;
  @Expose()
  get requirements() {
    return this.call_to_action;
  }

  image_url: string;
  @Expose()
  get thumbnail() {
    return this.image_url;
  }

  platform: Platform;
  @Expose()
  get isDesktop() {
    return this.platform === Platform.Desktop ? 1 : 0;
  }

  device: string;
  @Expose()
  get isAndroid() {
    return this.device === 'iphone_ipad' ? 0 : 1;
  }

  @Expose()
  get isIos() {
    return this.device === 'iphone_ipad' ? 1 : 0;
  }

  offer_url: string;
  @Expose()
  get offerUrlTemplate() {
    return this.offer_url;
  }

  @Expose()
  get providerName() {
    return Provider.Offer1;
  }

  offer_id: string;
  @Expose()
  @IsString()
  get externalOfferId() {
    return this.offer_id;
  }
}
enum Platform {
  Desktop = 'desktop',
  Mobile = 'mobile',
}
class Response {
  @Expose()
  @Type(() => Offer)
  offers: Offer[];
}
export class Offer1Dto implements IOfferDto {
  @Type(() => Response)
  response: Response;

  @Expose()
  get offerList(): Partial<IOffer>[] {
    return this.response.offers;
  }
}
