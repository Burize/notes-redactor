import { initialCommunicationField } from 'shared/helpers/redux/initialCommunicationField';
import * as NS from '../namespace';

export const initial: NS.IReduxState = {
  communication: {
    loadingCountries: initialCommunicationField,
  },
  data: {
    countries: [
      { code: 'ru', title: 'Russia' },
      { code: 'us', title: 'Amerika' },
      { code: 'uk', title: 'United Kingdom' },
    ],
  },
};
