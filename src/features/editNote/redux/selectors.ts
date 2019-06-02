import { makeSelectFeatureState } from 'shared/helpers/redux';
import { IAppReduxState } from 'shared/types/redux';
import makeCommunicationSelector from 'shared/helpers/redux/makeCommunicationSelector';

export const selectFeatureState = makeSelectFeatureState('editNote');

export const selectCommunication = makeCommunicationSelector(selectFeatureState);

export const selectMarkdownById = (state: IAppReduxState, id: string): string | null => {
  return selectFeatureState(state).data.markdowns[id] || null;
};
