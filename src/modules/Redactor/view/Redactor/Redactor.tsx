import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { block } from 'shared/helpers/bem';
import { NoteRedactor, CreateNoteButton } from 'features/manageNote';
import { ShowNotesButton } from 'features/showNotes';
import { Layout } from 'shared/view';
import { Header } from 'modules/shared';
import { routes } from 'modules/routes';

const b = block('Domain');

type IProps = RouteComponentProps<{ id: string }>;

export default (props: IProps) => {

  const { history, match: { params: { id } } } = props;
  const openNote = React.useCallback((noteId: string) => {
    history.push(routes.note.make(noteId));
  }, []);

  const headerActions = [
    <ShowNotesButton onNoteSelect={openNote} key="showNotes">Notes</ShowNotesButton>,
    <CreateNoteButton onCreate={openNote} key="createNote">New</CreateNoteButton>,
  ];
  const header = <Header actions={headerActions} />;

  return (
    <Layout header={header}>
      <div className={b()}><NoteRedactor noteId={id} /></div>
    </Layout>
  );
};
