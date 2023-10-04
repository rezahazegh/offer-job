import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entity/offer.entity';
import { ProviderModule } from '../provider/provider.module';
import { SerializerModule } from '../serializer/serializer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer]),
    ProviderModule,
    SerializerModule,
  ],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
