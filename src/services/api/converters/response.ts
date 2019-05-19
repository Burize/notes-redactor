import { ICountry } from 'shared/types/models';

import { ICountryResponse } from '../types';

export function convertCountryResponse(countries: ICountryResponse[]): ICountry[] {
  return countries.map(country => ({ code: country.code, title: country.title }));
}
