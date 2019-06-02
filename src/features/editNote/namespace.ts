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
    markdowns: { [id: string]: string },
  };
}

// export type ILoadCountries = IPlainAction<'CREATE_DOMAIN:LOAD_COUNTRIES'>;
// export type ILoadCountriesComplete = IAction<'CREATE_DOMAIN:LOAD_COUNTRIES_COMPLETE', { countries: ICountry[] }>;
// export type ILoadCountriesFail = IPlainFailAction<'CREATE_DOMAIN:LOAD_COUNTRIES_FAIL'>;

export type ISetMarkdown = IAction<'FORMAT_MARKDOWN:SET_MARKDOWN', { id: string, markdown: string }>;

export type Action = ISetMarkdown
  ;
