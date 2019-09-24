import { Flavoring, PartialBy } from '../utils';

export type NoteId = Flavoring<'noteId', string>;
export type TemporaryId = Flavoring<'temporaryId', string>;

export interface INote {
  id: NoteId;
  title: string;
  body: string;
}

export type NoteFieldsForCreation = Omit<INote, 'id'>;

export type PartialNote = PartialBy<INote, 'title' | 'body'>;
