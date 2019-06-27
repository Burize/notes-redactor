export interface IServerNote {
  id: string;
  title: string;
  body: string;
}

export interface ISyncNoteResponse {
  note: IServerNote;
  rawId: string;
}
