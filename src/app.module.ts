import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfferModule } from './offer/offer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderModule } from './provider/provider.module';
import { SerializerModule } from './serializer/serializer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_APP_USER'),
          password: configService.get('DB_APP_PASS'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          schema: configService.get('DB_SCHEMA'),
          synchronize: true,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    OfferModule,
    ProviderModule,
    SerializerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
