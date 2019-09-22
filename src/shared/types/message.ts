import { NoteId } from './models/note';

export interface IMessageEvent extends MessageEvent {
  data: Message;
}

export type Message = ChangeNoteId;

export type ChangeNoteId = IMessage<'changeNoteId', {
  noteId: NoteId;
}>;

export interface IMessage<T extends MessageType, P extends object> {
  type: T;
  payload: P;
}

export type MessageType = 'changeNoteId';
