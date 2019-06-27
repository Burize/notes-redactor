import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { block } from 'shared/helpers/bem';
import { NoteRedactor, CreateNoteButton } from 'features/manageNote';
import { ShowNotesButton } from 'features/showNotes';
import { Layout } from 'shared/view';
import { Header } from 'modules/shared';
import { routes } from 'modules/routes';
import { Icon } from 'shared/view/elements';

import { CreateNewNote } from './components';

import './Redactor.scss';

const b = block('redactor');

type IProps = RouteComponentProps<{ id: string }>;

export default (props: IProps) => {

  const { history, match: { params: { id } } } = props;
  const openNote = React.useCallback((noteId: string) => {
    history.push(routes.redactor.make(noteId));
  }, []);

  const redirectToMain = React.useCallback(() => {
    history.push(routes.redactor.make());
  }, []);

  const header = (
    <Header
      leftActions={
        <ShowNotesButton onNoteSelect={openNote} className={b('header-button')} selectedNoteId={id}>
          <Icon name="list alternate outline" size="large" fitted />
        </ShowNotesButton>}
      rightActions={
        <CreateNoteButton onCreate={openNote} className={b('header-button')}>
          Write something
        </CreateNoteButton>}
    />
  );

  return (
    <Layout header={header}>
      <div className={b()}>
        {id && <NoteRedactor noteId={id} onDeleteNote={redirectToMain} />}
        {!id && <CreateNewNote onCreateNote={openNote} />}
      </div>
    </Layout>
  );
};
