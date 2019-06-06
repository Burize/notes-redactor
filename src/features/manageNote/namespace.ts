import { ICommunication, IPlainFailAction, IAction } from 'shared/types/redux';
import { INote } from 'shared/types/models';

export interface IReduxState {
  communication: {
    loadingNote: ICommunication;
    creatingNote: ICommunication;
  };
  data: {
    note: INote | null,
  };
}

type PartialNote = Partial<Pick<INote, 'title' | 'body'>>;

export type ILoadNoteById = IAction<'MANAGE_NOTE:LOAD_NOTE_BY_ID', { id: string }>;
export type ILoadNoteByIdComplete = IAction<'MANAGE_NOTE:LOAD_NOTE_BY_ID_COMPLETE', { note: INote }>;
export type ILoadNoteByIdFail = IPlainFailAction<'MANAGE_NOTE:LOAD_NOTE_BY_ID_FAIL'>;

export type ICreateNote = IAction<'MANAGE_NOTE:CREATE_NOTE', PartialNote>;
export type ICreateNoteComplete = IAction<'MANAGE_NOTE:CREATE_NOTE_COMPLETE', { note: INote }>;
export type ICreateNoteFail = IPlainFailAction<'MANAGE_NOTE:CREATE_NOTE_FAIL'>;

export type IUpdateNote = IAction<'MANAGE_NOTE:UPDATE_NOTE', PartialNote>;

export type Action = IUpdateNote
  | ILoadNoteById | ILoadNoteByIdComplete | ILoadNoteByIdFail
  | ICreateNote | ICreateNoteComplete | ICreateNoteFail
  ;
