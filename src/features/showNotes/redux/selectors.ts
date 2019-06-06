import { makeSelectFeatureState } from 'shared/helpers/redux';
import { IAppReduxState } from 'shared/types/redux';
import makeCommunicationSelector from 'shared/helpers/redux/makeCommunicationSelector';
import { INote } from 'shared/types/models';

export const selectFeatureState = makeSelectFeatureState('showNotes');

export const selectCommunication = makeCommunicationSelector(selectFeatureState);

export const selectNotes = (state: IAppReduxState): INote[] => {
  return selectFeatureState(state).data.notes;
};
