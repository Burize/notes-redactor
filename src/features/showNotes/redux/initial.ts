import { initialCommunicationField } from 'shared/helpers/redux/initialCommunicationField';
import * as NS from '../namespace';

export const initial: NS.IReduxState = {
  communication: {
    loadingNotes: initialCommunicationField,
  },
  data: {
    notes: [],
  },
};
