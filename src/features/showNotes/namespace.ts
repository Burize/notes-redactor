import { ICommunication, IPlainAction, IPlainFailAction, IAction } from 'shared/types/redux';
import { INote } from 'shared/types/models';

export type IParsedNote = Pick<INote, 'id' | 'title'> & { parsedBody: string };

export interface IReduxState {
  communication: {
    loadingNotes: ICommunication;
  };
  data: {
    notes: IParsedNote[],
  };
}

export type ILoadNotes = IPlainAction<'SHOW_NOTES:LOAD_NOTES'>;
export type ILoadNotesComplete = IAction<'SHOW_NOTES:LOAD_NOTES_COMPLETE', { notes: IParsedNote[] }>;
export type ILoadNotesFail = IPlainFailAction<'SHOW_NOTES:LOAD_NOTES_FAIL'>;

export type Action = ILoadNotes | ILoadNotesComplete | ILoadNotesFail
  ;
