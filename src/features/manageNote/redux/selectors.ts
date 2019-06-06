import { makeSelectFeatureState } from 'shared/helpers/redux';
import { IAppReduxState } from 'shared/types/redux';
import makeCommunicationSelector from 'shared/helpers/redux/makeCommunicationSelector';
import { INote } from 'shared/types/models';

export const selectFeatureState = makeSelectFeatureState('editNote');

export const selectCommunication = makeCommunicationSelector(selectFeatureState);

export const selectNote = (state: IAppReduxState): INote | null => {
  return selectFeatureState(state).data.note;
};
