import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'shared/helpers/redux';

import * as NS from '../../namespace';

import { initial } from '../initial';

export const communicationReducer = combineReducers<NS.IReduxState['communication']>({

  loadingNote: makeCommunicationReducer<NS.ILoadNoteById, NS.ILoadNoteByIdComplete, NS.ILoadNoteByIdFail>(
    'EDIT_NOTE:LOAD_NOTE_BY_ID',
    'EDIT_NOTE:LOAD_NOTE_BY_ID_COMPLETE',
    'EDIT_NOTE:LOAD_NOTE_BY_ID_FAIL',
    initial.communication.loadingNote,
  ),
});
