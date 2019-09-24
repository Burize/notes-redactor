// tslint:disable: interface-over-type-literal
import * as IDB from 'idb';
import ObjectID from 'bson-objectid';

import { INote, NoteFieldsForCreation } from 'shared/types/models';

interface INoteStorage {
  createNote: CreateNote;
}

type CreateNote = {
  (note: INote): Promise<undefined>;
  (note: NoteFieldsForCreation): Promise<INote>;
};

class NoteStorage implements INoteStorage {

  public async initialize() {
    await this.checkVersion();
  }

  public async refreshStore(notes: INote[]) {
    const { store, tx } = await this.createTx();
    await store.clear();
    const actions = notes.map(note => store.add(note));
    await Promise.all(actions);
    return tx.done;
  }

  public async createNote(note: INote): Promise<undefined>;
  public async createNote(note: NoteFieldsForCreation): Promise<INote>;
  public async createNote(note: INote | NoteFieldsForCreation) {
    if ('id' in note) {
      return this.addNoteToStore(note);
    } else {
      return this.createTemporaryNote(note);
    }
  }

  public async getNote(id: string) {
    const { store, tx } = await this.createTx('readonly');
    const note: INote | void = await store.get(id);
    await tx.done;
    return note;
  }

  public async getAllNotes() {
    const { store, tx } = await this.createTx('readonly');
    const notes = await store.getAll();
    await tx.done;
    return notes;
  }

  public async updateNote(note: INote) {
    const { store, tx } = await this.createTx();
    await store.put(note);
    return tx.done;
  }

  public async deleteNote(id: string) {
    const { store, tx } = await this.createTx();
    await store.delete(id);
    return tx.done;
  }

  public async hasUnsavedData() {
    const db = await IDB.openDB('Notes', 1);
    const tx = db.transaction('outbox', 'readonly');
    const store = tx.objectStore('outbox');
    const rowsAmount = await store.count();
    return rowsAmount > 0;
  }

  public async createTemporaryStorage() {
    const isOffline = await this.hasUnsavedData();

    if (isOffline) {
      return;
    }
    const db = await IDB.openDB('Notes', 1);

    const noteTx = db.transaction('notes', 'readonly');
    const noteStore = noteTx.objectStore('notes');
    const notes: INote[] = await noteStore.getAll();
    await noteTx.done;

    const outboxTx = db.transaction('outbox', 'readwrite');
    const outboxStore = outboxTx.objectStore('outbox');
    const actions = notes.map(note => outboxStore.add(note));
    await Promise.all(actions);
    return outboxTx.done;
  }

  public async synchronizeStorage(notes: INote[]) {
    const db = await IDB.openDB('Notes', 1);

    const noteTx = db.transaction('notes', 'readwrite');
    const noteStore = noteTx.objectStore('notes');
    await noteStore.clear();
    const actions = notes.map(note => noteStore.add(note));
    await Promise.all(actions);
    await noteTx.done;

    const outboxTx = db.transaction('outbox', 'readwrite');
    const outboxStore = outboxTx.objectStore('outbox');
    await outboxStore.clear();
    return outboxTx.done;
  }

  private async createTx(mode: IDBTransactionMode = 'readwrite') {
    const db = await IDB.openDB('Notes', 1);
    const isOffline = await this.hasUnsavedData();
    const storeName = isOffline ? 'outbox' : 'notes';
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    return { store, tx };
  }

  private async addNoteToStore(note: INote) {
    const { store, tx } = await this.createTx();
    await store.add(note);
    return tx.done;
  }

  private async createTemporaryNote(noteRequest: NoteFieldsForCreation) {
    const { store, tx } = await this.createTx();
    const note: INote = { ...noteRequest, id: ObjectID.generate() };
    await store.add(note);
    await tx.done;
    return note;
  }

  private async checkVersion() {
    await IDB.openDB('Notes', 1, { upgrade: this.createStore });
  }

  private createStore(upgrade: IDB.IDBPDatabase) {
    const storeNames: DOMStringList = upgrade.objectStoreNames as any;
    if (!storeNames.contains('notes')) {
      upgrade.createObjectStore('notes', { keyPath: 'id' });
    }
    if (!storeNames.contains('outbox')) {
      upgrade.createObjectStore('outbox', { keyPath: 'id' });
    }
  }
}

export default new NoteStorage();
