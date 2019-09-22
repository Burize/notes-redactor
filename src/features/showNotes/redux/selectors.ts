import { makeSelectFeatureState } from 'shared/helpers/redux';
import { IAppReduxState } from 'shared/types/redux';
import makeCommunicationSelector from 'shared/helpers/redux/makeCommunicationSelector';

import { IParsedNote } from '../namespace';

export const selectFeatureState = makeSelectFeatureState('showNotes');

export const selectCommunication = makeCommunicationSelector(selectFeatureState);

export const selectNotes = (state: IAppReduxState): IParsedNote[] => {
  return selectFeatureState(state).data.notes;
};
