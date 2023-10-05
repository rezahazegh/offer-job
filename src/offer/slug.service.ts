import { Injectable } from '@nestjs/common';
import * as base62 from 'base62/lib//ascii';

@Injectable()
export class SlugService {
  generateSlug(id: number) {
    // to have at least 7 characters slug we add 100000000000 to the id
    const plainValue = id + 100000000000;
    return base62.encode(plainValue);
  }
}
