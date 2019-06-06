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
});
