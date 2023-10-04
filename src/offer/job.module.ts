import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entity/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
