import { Injectable } from '@nestjs/common';
import { Provider } from '../offer/enum/provider.enum';
import { payload as payload1 } from '../../payload/offer1.payload';
import { payload as payload2 } from '../../payload/offer2.payload';

@Injectable()
export class ProviderService {
  getListOfActiveProviders(): Provider[] {
    return Object.values(Provider);
  }
  fetchData(provider: Provider) {
    switch (provider) {
      case Provider.Offer1:
        return payload1;
      case Provider.Offer2:
        return payload2;
    }
  }
}
