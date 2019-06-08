import * as React from 'react';
import { block } from 'shared/helpers/bem';
import { CreateNoteButton } from 'features/manageNote';

import './CreateNewNote.scss';

interface IProps {
  onCreateNote(noteId: string): void;
}

const b = block('create-new-note');

function CreateNewNote(props: IProps) {
  const { onCreateNote } = props;
  return (
    <div className={b()}>
      <div className={b('preview')} />
      <div className={b('actions')}>
        <CreateNoteButton onCreate={onCreateNote} key="createNote">Create new note</CreateNoteButton>
      </div>
    </div>
  );
}

export default CreateNewNote;
