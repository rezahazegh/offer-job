import { Controller, Get } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  fetchOffers() {
    return this.jobService.fetchOffers();
  }
}
