import * as React from 'react';
import { block } from 'shared/helpers/bem';
import { CreateNoteButton } from 'features/manageNote';

import noteStub from './images/noteStub.png';

import './CreateNewNote.scss';

interface IProps {
  onCreateNote(noteId: string): void;
}

const b = block('create-new-note');

function CreateNewNote(props: IProps) {
  const { onCreateNote } = props;
  return (
    <div className={b()}>
      <div className={b('content')}>
        <img src={noteStub} className={b('preview')} />
        <CreateNoteButton onCreate={onCreateNote}>Create new note</CreateNoteButton>
      </div>
    </div>
  );
}

export default CreateNewNote;
