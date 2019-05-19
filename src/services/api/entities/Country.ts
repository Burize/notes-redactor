import { bind } from 'decko';
import { ICountry } from 'shared/types/models';

import { convertCountryResponse } from '../converters';
import BaseApi from './BaseApi';
import { ICountryResponse } from '../types';

class Country extends BaseApi {

  @bind
  public async loadCountries(): Promise<ICountry[]> {
    const response = await this.actions.get<ICountryResponse[]>({
      url: `countries`,
    });
    // return convertCountryResponse(response.data);
    return this.handleResponse(response, convertCountryResponse);
  }

}

export default Country;
