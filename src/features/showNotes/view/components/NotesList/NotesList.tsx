import * as React from 'react';

import { Modal } from 'shared/view/elements';
import { block } from 'shared/helpers/bem';
import { INote } from 'shared/types/models';

import Note from '../Note/Note';

import './NotesList.scss';

interface IProps {
  isOpen: boolean;
  notes: INote[];
  selectedNoteId?: string;
  onClose(): void;
  onSelect(noteId: string): void;
}

const b = block('notes-list');

function NotesList(props: IProps) {
  const { isOpen, notes, onSelect, onClose, selectedNoteId } = props;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Your notes</Modal.Header>
      <Modal.Content scrolling>
        <div>
          {notes.map(note => (
            <div key={note.id} className={b('note')}>
              <Note note={note} onSelect={onSelect} active={note.id === selectedNoteId} />
            </div>
          ))}
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default NotesList;
