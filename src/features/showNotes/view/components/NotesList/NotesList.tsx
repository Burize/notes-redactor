import * as React from 'react';
import { List } from 'react-content-loader';

import { Modal } from 'shared/view/elements';
import { block } from 'shared/helpers/bem';

import { IParsedNote } from '../../../namespace';
import Note from '../Note/Note';

import './NotesList.scss';

interface IProps {
  isOpen: boolean;
  isLoading: boolean;
  notes: IParsedNote[];
  selectedNoteId?: string;
  onClose(): void;
  onSelect(noteId: string): void;
}

const b = block('notes-list');

function NotesList(props: IProps) {
  const { isOpen, notes, onSelect, onClose, selectedNoteId, isLoading } = props;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Your notes</Modal.Header>
      <Modal.Content scrolling>
        <div>
          {isLoading && <><List /><List /><List /><List /></>}
          {!isLoading && notes.map(note => (
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
