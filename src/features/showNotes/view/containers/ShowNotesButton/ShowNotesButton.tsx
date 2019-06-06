import * as React from 'react';
import { connect } from 'react-redux';

// import { block } from 'shared/helpers/bem';
import { IAppReduxState, ICommunication } from 'shared/types/redux';
import { Button } from 'shared/view/elements';
import { INote } from 'shared/types/models';

import { selectors, actions } from '../../../redux';
import { NotesList } from '../../components';

import './ShowNotesButton.scss';

// const b = block('show-notes-button');

interface IStateProps {
  notes: INote[];
  loadingNotes: ICommunication;
}

type IActionsDispatch = typeof actionsDispatch;

interface IOwnProps {
  children?: React.ReactNode;
  onNoteSelect(noteId: string): void;
}

type IProps = IOwnProps & IActionsDispatch & IStateProps;
const ShowNotesButton = (props: IProps) => {
  const { children, onNoteSelect, notes, loadNotes, loadingNotes } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    loadNotes();
  }, []);

  const toggleVisible = React.useCallback(() => setIsOpen(!isOpen), []);
  const closeModal = React.useCallback(() => setIsOpen(false), []);
  const onSelect = React.useCallback((noteId: string) => {
    setIsOpen(false);
    onNoteSelect(noteId);
  }, []);

  return (
    <>
      <Button onClick={toggleVisible} disabled={loadingNotes.isRequesting}>{children}</Button>
      <NotesList notes={notes} isOpen={isOpen} onClose={closeModal} onSelect={onSelect} />
    </>
  );
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    notes: selectors.selectNotes(state),
    loadingNotes: selectors.selectCommunication(state, 'loadingNotes'),

  };
}

const actionsDispatch = {
  loadNotes: actions.loadNotes,
};

export default connect(mapState, actionsDispatch)(ShowNotesButton);
