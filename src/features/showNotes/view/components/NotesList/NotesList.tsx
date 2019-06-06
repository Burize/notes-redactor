import * as React from 'react';

import { Modal } from 'shared/view/elements';
import { block } from 'shared/helpers/bem';
import { INote } from 'shared/types/models';

import Note from '../Note/Note';

import './NotesList.scss';

interface IProps {
  isOpen: boolean;
  notes: INote[];
  onClose(): void;
  onSelect(noteId: string): void;
}

const b = block('notes-list');

function NotesList(props: IProps) {
  const { isOpen, notes, onSelect, onClose } = props;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Your notes</Modal.Header>
      <Modal.Content image scrolling>
        <div>
          {notes.map(note => (
            <div className={b('note')}><Note note={note} onSelect={onSelect} /></div>
          ))}
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default NotesList;
