export interface INote {
  id: string;
  title: string;
  body: string;
}

export type NoteFieldsForCreation = Omit<INote, 'id'>;

export type PartialNote = Partial<Omit<INote, 'id'>> & { id: INote['id'] }; // TODO: rework
