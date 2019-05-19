import { ICommunication, IPlainAction, IPlainFailAction, IAction } from 'shared/types/redux';
import { ICountry } from 'shared/types/models';

export interface IOption<T = string> {
  value: T;
  label: string;
}

export interface IReduxState {
  communication: {
    loadingCountries: ICommunication;
  };
  data: {
    countries: ICountry[],
  };
}

export type ILoadCountries = IPlainAction<'CREATE_DOMAIN:LOAD_COUNTRIES'>;
export type ILoadCountriesComplete = IAction<'CREATE_DOMAIN:LOAD_COUNTRIES_COMPLETE', { countries: ICountry[] }>;
export type ILoadCountriesFail = IPlainFailAction<'CREATE_DOMAIN:LOAD_COUNTRIES_FAIL'>;

export type Action =
  ILoadCountries | ILoadCountriesComplete | ILoadCountriesFail
  ;
