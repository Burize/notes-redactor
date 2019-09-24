import { BindAll } from 'lodash-decorators';

import { INote, NoteFieldsForCreation, PartialNote, NoteId } from 'shared/types/models';

import BaseApi from './BaseApi';
import { convertNoteResponse } from '../converters';
import { IServerNote } from '../types/Note';

@BindAll()
export default class Note extends BaseApi {

  public async loadNotes(): Promise<INote[]> {
    const response = await this.actions.get<IServerNote[]>({
      url: `notes`,
    });
    return this.handleResponse<IServerNote[], INote[]>(response, (notes) => notes.map(convertNoteResponse));
  }

  public async loadNoteById(id: NoteId): Promise<INote> {
    const response = await this.actions.get<IServerNote>({
      url: `note/${id}`,
    });
    return this.handleResponse(response, convertNoteResponse);
  }

  public async createNote(note: NoteFieldsForCreation): Promise<INote> {
    const response = await this.actions.post<IServerNote>({
      url: `note`,
      data: { ...note },
    });
    return this.handleResponse(response, convertNoteResponse);
  }

  public async updateNote(note: PartialNote): Promise<void> {
    const response = await this.actions.patch({
      url: `note`,
      data: { ...note },
    });
    return this.handleResponse(response);
  }

  public async deleteNote(id: NoteId): Promise<void> {
    const response = await this.actions.delete({
      url: `note`,
      data: { id },
    });
    return this.handleResponse(response);
  }
}
