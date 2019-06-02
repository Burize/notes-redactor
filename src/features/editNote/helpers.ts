import { ICountry } from 'shared/types/models';

import { IOption } from './namespace';

export const covertCountryToOption = (country: ICountry): IOption => (
  { value: country.code, label: country.title });
