import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'shared/helpers/redux';

// tslint:disable:max-line-length

export const { execute: loadNote, completed: loadNoteCompleted, failed: loadNoteFailed } =
  makeCommunicationActionCreators<NS.ILoadNoteById, NS.ILoadNoteByIdComplete, NS.ILoadNoteByIdFail>(
    'EDIT_NOTE:LOAD_NOTE_BY_ID', 'EDIT_NOTE:LOAD_NOTE_BY_ID_COMPLETE', 'EDIT_NOTE:LOAD_NOTE_BY_ID_FAIL',
  );
