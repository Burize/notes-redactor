import { put, call, takeEvery } from 'redux-saga/effects';

import { IDependencies } from 'shared/types/redux';
import { getErrorMessage } from 'shared/helpers/error';
import { ReturnPromisedType } from 'shared/types/utils';

import * as actions from './actions';
import * as NS from '../namespace';

const loadNoteType: NS.ILoadNoteById['type'] = 'MANAGE_NOTE:LOAD_NOTE_BY_ID';
const createNoteType: NS.ICreateNote['type'] = 'MANAGE_NOTE:CREATE_NOTE';
const updateNoteType: NS.IUpdateNote['type'] = 'MANAGE_NOTE:UPDATE_NOTE';
const deleteNoteType: NS.IDeleteNote['type'] = 'MANAGE_NOTE:DELETE_NOTE';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(loadNoteType, loadNote, deps);
  yield takeEvery(createNoteType, createNote, deps);
  yield takeEvery(updateNoteType, updateNote, deps);
  yield takeEvery(deleteNoteType, deleteNote, deps);
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

export function* updateNote({ api }: IDependencies, action: NS.IUpdateNote) {
  try {
    const note = action.payload;
    yield call(api.note.updateNote, note);
    yield put(actions.updateNoteCompleted());
  } catch (error) {
    const message = getErrorMessage(error);
    yield put(actions.updateNoteFailed(message));
  }
}

export function* deleteNote({ api }: IDependencies, action: NS.IUpdateNote) {
  try {
    const { id } = action.payload;
    yield call(api.note.deleteNote, id);
    yield put(actions.deleteNoteCompleted());
  } catch (error) {
    const message = getErrorMessage(error);
    yield put(actions.deleteNoteFailed(message));
  }
}
