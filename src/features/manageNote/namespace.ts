import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';
import { INote, NoteFieldsForCreation, PartialNote, NoteId } from 'shared/types/models';

export interface IReduxState {
  communication: {
    loadingNote: ICommunication;
    creatingNote: ICommunication;
    updatingNote: ICommunication;
    deletingNote: ICommunication;
  };
  data: {
    note: INote | null,
  };
}

export type ILoadNoteById = IAction<'MANAGE_NOTE:LOAD_NOTE_BY_ID', { id: NoteId }>;
export type ILoadNoteByIdComplete = IAction<'MANAGE_NOTE:LOAD_NOTE_BY_ID_COMPLETE', { note: INote }>;
export type ILoadNoteByIdFail = IPlainFailAction<'MANAGE_NOTE:LOAD_NOTE_BY_ID_FAIL'>;

export type ICreateNote = IAction<'MANAGE_NOTE:CREATE_NOTE', NoteFieldsForCreation>;
export type ICreateNoteComplete = IAction<'MANAGE_NOTE:CREATE_NOTE_COMPLETE', { note: INote }>;
export type ICreateNoteFail = IPlainFailAction<'MANAGE_NOTE:CREATE_NOTE_FAIL'>;

export type IUpdateNote = IAction<'MANAGE_NOTE:UPDATE_NOTE', PartialNote>;
export type IUpdateNoteComplete = IPlainAction<'MANAGE_NOTE:UPDATE_NOTE_COMPLETE'>;
export type IUpdateNoteFail = IPlainFailAction<'MANAGE_NOTE:UPDATE_NOTE_FAIL'>;

export type IDeleteNote = IAction<'MANAGE_NOTE:DELETE_NOTE', { id: NoteId }>;
export type IDeleteNoteComplete = IPlainAction<'MANAGE_NOTE:DELETE_NOTE_COMPLETE'>;
export type IDeleteNoteFail = IPlainFailAction<'MANAGE_NOTE:DELETE_NOTE_FAIL'>;

export type Action =
  | ILoadNoteById | ILoadNoteByIdComplete | ILoadNoteByIdFail
  | ICreateNote | ICreateNoteComplete | ICreateNoteFail
  | IUpdateNote | IUpdateNoteComplete | IUpdateNoteFail
  | IDeleteNote | IDeleteNoteComplete | IDeleteNoteFail
  ;
