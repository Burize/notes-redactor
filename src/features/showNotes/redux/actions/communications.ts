import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'shared/helpers/redux';

// tslint:disable:max-line-length

export const { execute: loadNotes, completed: loadNotesCompleted, failed: loadNotesFailed } =
  makeCommunicationActionCreators<NS.ILoadNotes, NS.ILoadNotesComplete, NS.ILoadNotesFail>(
    'SHOW_NOTES:LOAD_NOTES', 'SHOW_NOTES:LOAD_NOTES_COMPLETE', 'SHOW_NOTES:LOAD_NOTES_FAIL',
  );
