export interface INote {
  id: string;
  title: string;
  body: string;
}

export type NoteFieldsForCreation = Partial<Pick<INote, 'title' | 'body'>>;

export type PartialNote = Partial<Pick<INote, 'title' | 'body'>> & { id: INote['id'] }; // TODO: rework
