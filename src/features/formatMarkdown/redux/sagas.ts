import { put, call, takeEvery } from 'redux-saga/effects';

import { IDependencies } from 'shared/types/redux';
import { getErrorMessage } from 'shared/helpers/error';
import { ReturnPromisedType } from 'shared/types/utils';

import * as actions from './actions';
import * as NS from '../namespace';

const loadBoardType: NS.ILoadCountries['type'] = 'CREATE_DOMAIN:LOAD_COUNTRIES';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(loadBoardType, loadBoard, deps);
}

export function* loadBoard({ api }: IDependencies, _action: NS.ILoadCountries) {
  try {
    const countries: ReturnPromisedType<typeof api.country.loadCountries> =
      yield call(api.country.loadCountries);

    yield put(actions.loadCountriesCompleted({ countries }));

  } catch (error) {
    const message = getErrorMessage(error);
    yield put(actions.loadCountriesFailed(message));
  }
}
