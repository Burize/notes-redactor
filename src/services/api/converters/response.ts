import { INote } from 'shared/types/models';

import { INoteResponse } from '../types/Note';

export function convertNoteResponse(note: INoteResponse): INote {
  return { id: note.id, title: note.title, body: note.body };
}
