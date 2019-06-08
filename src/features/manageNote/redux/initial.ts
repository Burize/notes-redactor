import { initialCommunicationField } from 'shared/helpers/redux/initialCommunicationField';
import * as NS from '../namespace';

export const initial: NS.IReduxState = {
  communication: {
    loadingNote: initialCommunicationField,
    creatingNote: initialCommunicationField,
    updatingNote: initialCommunicationField,
  },
  data: {
    note: null,
  },
};
