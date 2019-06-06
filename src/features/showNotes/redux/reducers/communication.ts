import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'shared/helpers/redux';

import * as NS from '../../namespace';

import { initial } from '../initial';

export const communicationReducer = combineReducers<NS.IReduxState['communication']>({

  loadingNotes: makeCommunicationReducer<NS.ILoadNotes, NS.ILoadNotesComplete, NS.ILoadNotesFail>(
    'SHOW_NOTES:LOAD_NOTES',
    'SHOW_NOTES:LOAD_NOTES_COMPLETE',
    'SHOW_NOTES:LOAD_NOTES_FAIL',
    initial.communication.loadingNotes,
  ),
});
