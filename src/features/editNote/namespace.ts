import { ICommunication, IPlainFailAction, IAction } from 'shared/types/redux';
import { INote } from 'shared/types/models';

export interface IReduxState {
  communication: {
    loadingNote: ICommunication;
  };
  data: {
    note: INote | null,
  };
}

type UpdatePayload = Partial<Pick<INote, 'title' | 'body'>>;

export type ILoadNoteById = IAction<'EDIT_NOTE:LOAD_NOTE_BY_ID', { id: string }>;
export type ILoadNoteByIdComplete = IAction<'EDIT_NOTE:LOAD_NOTE_BY_ID_COMPLETE', { note: INote }>;
export type ILoadNoteByIdFail = IPlainFailAction<'EDIT_NOTE:LOAD_NOTE_BY_ID_FAIL'>;

export type IUpdateNote = IAction<'EDIT_NOTE:UPDATE_NOTE', UpdatePayload>;

export type Action = IUpdateNote
  | ILoadNoteById | ILoadNoteByIdComplete | ILoadNoteByIdFail
  ;
