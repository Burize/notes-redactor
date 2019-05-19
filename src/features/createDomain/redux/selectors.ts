import { makeSelectFeatureState } from 'shared/helpers/redux';
import { IAppReduxState } from 'shared/types/redux';
import makeCommunicationSelector from 'shared/helpers/redux/makeCommunicationSelector';

import { covertCountryToOption } from '../helpers';
import { IOption } from '../namespace';

export const selectFeatureState = makeSelectFeatureState('createDomain');

export const selectCommunication = makeCommunicationSelector(selectFeatureState);

export const selectCountryOptions = (state: IAppReduxState): IOption[] => {
  return selectFeatureState(state).data.countries.map(covertCountryToOption);
};
