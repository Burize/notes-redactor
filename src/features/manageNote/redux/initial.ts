import { initialCommunicationField } from 'shared/helpers/redux/initialCommunicationField';
import * as NS from '../namespace';

export const initial: NS.IReduxState = {
  communication: {
    loadingNote: initialCommunicationField,
  },
  data: {
    note: null,
  },
};
