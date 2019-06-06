import { put, call, takeEvery } from 'redux-saga/effects';

import { IDependencies } from 'shared/types/redux';
import { getErrorMessage } from 'shared/helpers/error';
import { ReturnPromisedType } from 'shared/types/utils';

import * as actions from './actions';
import * as NS from '../namespace';

const loadNotesType: NS.ILoadNotes['type'] = 'SHOW_NOTES:LOAD_NOTES';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(loadNotesType, loadNotes, deps);
}

export function* loadNotes({ api }: IDependencies, _action: NS.ILoadNotes) {
  try {
    const notes: ReturnPromisedType<typeof api.note.loadNotes> =
      yield call(api.note.loadNotes);
    yield put(actions.loadNotesCompleted({ notes }));
  } catch (error) {
    const message = getErrorMessage(error);
    yield put(actions.loadNotesFailed(message));
  }
}
