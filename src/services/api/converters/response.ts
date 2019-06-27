import { INote } from 'shared/types/models';

import { IServerNote, ISyncNoteResponse } from '../types/Note';

export function convertNoteResponse(note: IServerNote): INote {
  return { id: note.id, title: note.title, body: note.body };
}

export function convertSynchronizeNotesResponse(refreshedNotes: ISyncNoteResponse[]) {
  return refreshedNotes.reduce((acc, cur) => ({
    notes: [...acc.notes, cur.note],
    idsMap: { ...acc.idsMap, [cur.rawId]: cur.note.id },
  }),
    { notes: [], idsMap: {} } as { notes: INote[], idsMap: Record<string, string> });
}
