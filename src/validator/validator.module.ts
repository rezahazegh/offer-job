import { Module } from '@nestjs/common';
import { ValidatorService } from './validator.service';

@Module({
  providers: [ValidatorService]
})
export class ValidatorModule {}
