import { Expose, Type } from 'class-transformer';
import { IOffer } from '../../offer/interface/offer.interface';
import { IsString } from 'class-validator';
import { Logger } from '@nestjs/common';
import { IOfferDto } from '../interface/offer-dto.interface';

class Offer implements Omit<IOffer, 'slug'> {
  // should be mapped to `externalOfferId`
  offer_id: string;
  // should be mapped to `name`
  offer_name: string;
  // should be mapped to `description`
  offer_desc: string;
  // should be mapped to `requirements`
  call_to_action: string;
  disclaimer: string;
  // should be mapped to offerUrlTemplate
  offer_url: string;
  offer_url_easy: string;
  payout: number;
  payout_type: string;
  amount: number;
  // should be mapped to `thumbnail`
  image_url: string;
  image_url_220x124: string;
  countries: string[];
  // combine platform and device to map to `isDesktop`, `isAndroid`, `isIos`
  platform: Platform; // possible values are "desktop" | "mobile"
  device: string; // anything else should be considered as android
  category: any;
  last_modified: number;
  preview_url: string;
  package_id: string;
  verticals: Vertical[];

  @Expose()
  get name() {
    return this.offer_name;
  }

  @Expose()
  get description() {
    return this.offer_desc;
  }

  @Expose()
  get requirements() {
    return this.call_to_action;
  }

  @Expose()
  get thumbnail() {
    return this.image_url;
  }

  @Expose()
  get isDesktop() {
    return this.platform === Platform.Desktop ? 1 : 0;
  }

  @Expose()
  get isAndroid() {
    return this.device === 'iphone_ipad' ? 0 : 1;
  }

  @Expose()
  get isIos() {
    return this.device === 'iphone_ipad' ? 1 : 0;
  }

  @Expose()
  get offerUrlTemplate() {
    return this.offer_url;
  }

  @Expose()
  get providerName() {
    return 'offer1';
  }

  @Expose()
  @IsString()
  get externalOfferId() {
    return this.offer_id;
  }
}
class Vertical {
  vertical_id: string;
  vertical_name: string;
}
enum Platform {
  Desktop = 'desktop',
  Mobile = 'mobile',
}

class Response {
  currency_name: string;

  offers_count: number;

  // @ValidateNested({ each: true })
  @Expose()
  @Type(() => Offer)
  offers: Offer[];
}

export class Offer1Dto implements IOfferDto {
  private readonly logger = new Logger(Offer1Dto.name);

  query: any;

  // @ValidateNested()
  @Type(() => Response)
  response: Response;

  @Expose()
  get offerList(): Partial<IOffer>[] {
    return this.response.offers;
  }
}
