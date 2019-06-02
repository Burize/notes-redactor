import { initialCommunicationField } from 'shared/helpers/redux/initialCommunicationField';
import * as NS from '../namespace';
import { MOCK_ID } from '../constants';

export const initial: NS.IReduxState = {
  communication: {
    loadingCountries: initialCommunicationField,
  },
  data: {
    markdowns: { [MOCK_ID]: 'initial markdown' },
  },
};
