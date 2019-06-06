import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { block } from 'shared/helpers/bem';
import { EditNote } from 'features/editNote';
import { ShowNotesButton } from 'features/showNotes';
import { Layout } from 'shared/view';
import { Header } from 'modules/shared';
import { routes } from 'modules/routes';

const b = block('Domain');

type IProps = RouteComponentProps<{ id: string }>;

export default (props: IProps) => {

  const { history, match: { params: { id } } } = props;
  const openNote = React.useCallback((noteId) => history.push(routes.note.make(noteId)), []);

  const headerActions = [<ShowNotesButton onNoteSelect={openNote} key="1">Notes</ShowNotesButton>];
  const header = <Header actions={headerActions} />;

  return (
    <Layout header={header}>
      <div className={b()}><EditNote noteId={id} /></div>
    </Layout>
  );
};
