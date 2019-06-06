import { put, call, takeEvery } from 'redux-saga/effects';

import { IDependencies } from 'shared/types/redux';
import { getErrorMessage } from 'shared/helpers/error';
import { ReturnPromisedType } from 'shared/types/utils';

import * as actions from './actions';
import * as NS from '../namespace';

const loadNoteType: NS.ILoadNoteById['type'] = 'EDIT_NOTE:LOAD_NOTE_BY_ID';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(loadNoteType, loadNote, deps);
}

export function* loadNote({ api }: IDependencies, action: NS.ILoadNoteById) {
  try {
    const { id } = action.payload;
    const note: ReturnPromisedType<typeof api.note.loadNoteById> =
      yield call(api.note.loadNoteById, id);

    yield put(actions.loadNoteCompleted({ note }));

  } catch (error) {
    const message = getErrorMessage(error);
    yield put(actions.loadNoteFailed(message));
  }
}
