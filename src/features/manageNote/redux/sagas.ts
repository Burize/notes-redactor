import { put, call, takeEvery } from 'redux-saga/effects';

import { IDependencies } from 'shared/types/redux';
import { getErrorMessage } from 'shared/helpers/error';
import { ReturnPromisedType } from 'shared/types/utils';

import * as actions from './actions';
import * as NS from '../namespace';

const loadNoteType: NS.ILoadNoteById['type'] = 'MANAGE_NOTE:LOAD_NOTE_BY_ID';
const createNoteType: NS.ICreateNote['type'] = 'MANAGE_NOTE:CREATE_NOTE';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(loadNoteType, loadNote, deps);
  yield takeEvery(createNoteType, createNote, deps);
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

export function* createNote({ api }: IDependencies, action: NS.ICreateNote) {
  try {
    const note = action.payload;
    const createdNote: ReturnPromisedType<typeof api.note.createNote> =
      yield call(api.note.createNote, note);
    yield put(actions.createNoteCompleted({ note: createdNote }));
  } catch (error) {
    const message = getErrorMessage(error);
    yield put(actions.loadNoteFailed(message));
  }
}