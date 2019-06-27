import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'shared/helpers/redux';

import * as NS from '../../namespace';

import { initial } from '../initial';

export const communicationReducer = combineReducers<NS.IReduxState['communication']>({

  loadingNote: makeCommunicationReducer<NS.ILoadNoteById, NS.ILoadNoteByIdComplete, NS.ILoadNoteByIdFail>(
    'MANAGE_NOTE:LOAD_NOTE_BY_ID',
    'MANAGE_NOTE:LOAD_NOTE_BY_ID_COMPLETE',
    'MANAGE_NOTE:LOAD_NOTE_BY_ID_FAIL',
    initial.communication.loadingNote,
  ),
  creatingNote: makeCommunicationReducer<NS.ICreateNote, NS.ICreateNoteComplete, NS.ICreateNoteFail>(
    'MANAGE_NOTE:CREATE_NOTE',
    'MANAGE_NOTE:CREATE_NOTE_COMPLETE',
    'MANAGE_NOTE:CREATE_NOTE_FAIL',
    initial.communication.creatingNote,
  ),
  updatingNote: makeCommunicationReducer<NS.IUpdateNote, NS.IUpdateNoteComplete, NS.IUpdateNoteFail>(
    'MANAGE_NOTE:UPDATE_NOTE',
    'MANAGE_NOTE:UPDATE_NOTE_COMPLETE',
    'MANAGE_NOTE:UPDATE_NOTE_FAIL',
    initial.communication.updatingNote,
  ),
  deletingNote: makeCommunicationReducer<NS.IDeleteNote, NS.IDeleteNoteComplete, NS.IDeleteNoteFail>(
    'MANAGE_NOTE:DELETE_NOTE',
    'MANAGE_NOTE:DELETE_NOTE_COMPLETE',
    'MANAGE_NOTE:DELETE_NOTE_FAIL',
    initial.communication.deletingNote,
  ),
});
