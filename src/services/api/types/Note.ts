import { NoteId, TemporaryId, INote } from 'shared/types/models';

export interface IServerNote {
  id: NoteId;
  title: string;
  body: string;
}

export interface IServerSyncNote {
  note: IServerNote;
  TemporaryId: string;
}

export interface ISyncNotes {
  notes: INote[];
  idsMap: Record<TemporaryId, NoteId>;
}
