import * as React from 'react';
import { connect } from 'react-redux';

import { GetProps } from 'shared/types/utils';
import { IAppReduxState, ICommunication } from 'shared/types/redux';
import { Button } from 'shared/view/elements';

import { selectors, actions } from '../../../redux';
import { NotesList } from '../../components';
import { IParsedNote } from '../../../namespace';

interface IStateProps {
  notes: IParsedNote[];
  loadingNotes: ICommunication;
  selectedNoteId?: string;
}

type IActionsDispatch = typeof actionsDispatch;

interface IOwnProps {
  children?: React.ReactNode;
  onNoteSelect(noteId: string): void;
}

type IProps = IOwnProps & IActionsDispatch & IStateProps & GetProps<typeof Button>;

const ShowNotesButton = (props: IProps) => {
  const { children, onNoteSelect, notes, loadNotes, loadingNotes, selectedNoteId, ...buttonProps } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const openNoteList = React.useCallback(() => {
    setIsOpen(true);
    loadNotes();
  }, []);
  const onSelect = React.useCallback((noteId: string) => {
    setIsOpen(false);
    onNoteSelect(noteId);
  }, []);
  const closeModal = React.useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Button {...buttonProps} onClick={openNoteList}>{children}</Button>
      <NotesList
        isLoading={loadingNotes.isRequesting}
        notes={notes}
        isOpen={isOpen}
        onClose={closeModal}
        onSelect={onSelect}
        selectedNoteId={selectedNoteId}
      />
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
