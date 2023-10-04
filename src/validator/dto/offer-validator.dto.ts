import { IOffer } from '../../offer/interface/offer.interface';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Provider } from '../../provider/enum/provider.enum';
import { NumericFlag } from '../../offer/enum/numeric-flag.enum';

export class OfferValidatorDto implements Omit<IOffer, 'slug'> {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  description: string;

  @IsString()
  requirements: string;

  @IsUrl()
  @MaxLength(255)
  thumbnail: string;

  @IsEnum(NumericFlag)
  isDesktop: number;

  @IsEnum(NumericFlag)
  isAndroid: number;

  @IsEnum(NumericFlag)
  isIos: number;

  @IsUrl()
  offerUrlTemplate: string;

  @IsEnum(Provider)
  @IsOptional()
  providerName: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  externalOfferId: string;
}
