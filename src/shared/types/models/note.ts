import { Branding } from '../utils';

export type NoteId = Branding<'noteId', string>;
export type TemporaryId = Branding<'temporaryId', string>;

export interface INote {
  id: NoteId;
  title: string;
  body: string;
}

export type NoteFieldsForCreation = Omit<INote, 'id'>;

export type PartialNote = Partial<INote>;
