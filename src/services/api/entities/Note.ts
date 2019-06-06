import { bind } from 'decko';
import { INote } from 'shared/types/models';

import BaseApi from './BaseApi';
import { convertNoteResponse } from '../converters';
import { INoteResponse } from '../types/Note';

export default class Note extends BaseApi {

  @bind
  public async loadNotes(): Promise<INote[]> {
    const response = await this.actions.get<INoteResponse[]>({
      url: `notes`,
    });
    return this.handleResponse<INoteResponse[], INote[]>(response, (notes) => notes.map(convertNoteResponse));
  }

  @bind
  public async loadNoteById(id: string): Promise<INote> {
    const response = await this.actions.get<INoteResponse>({
      url: `note/${id}`,
    });
    return this.handleResponse(response, convertNoteResponse);
  }

  @bind
  public async createNote(note: Partial<INote>): Promise<INote> {
    const response = await this.actions.post<INoteResponse>({
      url: `note`,
      data: { ...note },
    });
    return this.handleResponse(response, convertNoteResponse);
  }

}
