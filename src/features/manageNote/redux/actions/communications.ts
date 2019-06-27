import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'shared/helpers/redux';

// tslint:disable:max-line-length

export const { execute: loadNote, completed: loadNoteCompleted, failed: loadNoteFailed } =
  makeCommunicationActionCreators<NS.ILoadNoteById, NS.ILoadNoteByIdComplete, NS.ILoadNoteByIdFail>(
    'MANAGE_NOTE:LOAD_NOTE_BY_ID', 'MANAGE_NOTE:LOAD_NOTE_BY_ID_COMPLETE', 'MANAGE_NOTE:LOAD_NOTE_BY_ID_FAIL',
  );

export const { execute: createNote, completed: createNoteCompleted, failed: createNoteFailed } =
  makeCommunicationActionCreators<NS.ICreateNote, NS.ICreateNoteComplete, NS.ICreateNoteFail>(
    'MANAGE_NOTE:CREATE_NOTE', 'MANAGE_NOTE:CREATE_NOTE_COMPLETE', 'MANAGE_NOTE:CREATE_NOTE_FAIL',
  );

export const { execute: updateNote, completed: updateNoteCompleted, failed: updateNoteFailed } =
  makeCommunicationActionCreators<NS.IUpdateNote, NS.IUpdateNoteComplete, NS.IUpdateNoteFail>(
    'MANAGE_NOTE:UPDATE_NOTE', 'MANAGE_NOTE:UPDATE_NOTE_COMPLETE', 'MANAGE_NOTE:UPDATE_NOTE_FAIL',
  );

export const { execute: deleteNote, completed: deleteNoteCompleted, failed: deleteNoteFailed } =
  makeCommunicationActionCreators<NS.IDeleteNote, NS.IDeleteNoteComplete, NS.IDeleteNoteFail>(
    'MANAGE_NOTE:DELETE_NOTE', 'MANAGE_NOTE:DELETE_NOTE_COMPLETE', 'MANAGE_NOTE:DELETE_NOTE_FAIL',
  );
