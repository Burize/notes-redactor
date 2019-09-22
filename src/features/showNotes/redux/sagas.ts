import { put, call, all, takeEvery } from 'redux-saga/effects';

import { IDependencies } from 'shared/types/redux';
import { getErrorMessage } from 'shared/helpers/error';
import { ReturnPromisedType } from 'shared/types/utils';

import * as actions from './actions';
import * as NS from '../namespace';
import { markdownManager } from 'services/markdown';
import { INote } from 'shared/types/models';

const loadNotesType: NS.ILoadNotes['type'] = 'SHOW_NOTES:LOAD_NOTES';

export function* rootSaga(deps: IDependencies) {
  yield takeEvery(loadNotesType, loadNotes, deps);
}

export function* loadNotes({ api }: IDependencies, _action: NS.ILoadNotes) {
  try {
    const notes: ReturnPromisedType<typeof api.note.loadNotes> =
      yield call(api.note.loadNotes);

    const parsedNotes = yield all(notes.map(note => call(parseNoteBody(note))));
    yield put(actions.loadNotesCompleted({ notes: parsedNotes }));
  } catch (error) {
    const message = getErrorMessage(error);
    yield put(actions.loadNotesFailed(message));
  }
}

function parseNoteBody(note: INote) {
  return async (): Promise<NS.IParsedNote> => {
    const { id, title, body } = note;
    const parsedBody = await markdownManager.parseMarkdown(body);
    return { id, title, parsedBody };
  };
}
