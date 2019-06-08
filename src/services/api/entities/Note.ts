import { BindAll } from 'lodash-decorators';

import { INote, NoteFieldsForCreation, PartialNote } from 'shared/types/models';

import BaseApi from './BaseApi';
import { convertNoteResponse } from '../converters';
import { INoteResponse } from '../types/Note';

@BindAll()
export default class Note extends BaseApi {

  public async loadNotes(): Promise<INote[]> {
    const response = await this.actions.get<INoteResponse[]>({
      url: `notes`,
    });
    return this.handleResponse<INoteResponse[], INote[]>(response, (notes) => notes.map(convertNoteResponse));
  }

  public async loadNoteById(id: string): Promise<INote> {
    const response = await this.actions.get<INoteResponse>({
      url: `note/${id}`,
    });
    return this.handleResponse(response, convertNoteResponse);
  }

  public async createNote(note: NoteFieldsForCreation): Promise<INote> {
    const response = await this.actions.post<INoteResponse>({
      url: `note`,
      data: { ...note },
    });
    return this.handleResponse(response, convertNoteResponse);
  }

  public async updateNote(note: PartialNote): Promise<{}> {
    const response = await this.actions.patch({
      url: `note`,
      data: { ...note },
    });
    return this.handleResponse(response);
  }
}
