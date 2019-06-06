import { ICommunication, IPlainAction, IPlainFailAction, IAction } from 'shared/types/redux';
import { INote } from 'shared/types/models';

export interface IReduxState {
  communication: {
    loadingNotes: ICommunication;
  };
  data: {
    notes: INote[],
  };
}

export type ILoadNotes = IPlainAction<'SHOW_NOTES:LOAD_NOTES'>;
export type ILoadNotesComplete = IAction<'SHOW_NOTES:LOAD_NOTES_COMPLETE', { notes: INote[] }>;
export type ILoadNotesFail = IPlainFailAction<'SHOW_NOTES:LOAD_NOTES_FAIL'>;

export type Action = ILoadNotes | ILoadNotesComplete | ILoadNotesFail
  ;
