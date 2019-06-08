import * as React from 'react';
import { connect } from 'react-redux';

import { IAppReduxState, ICommunication } from 'shared/types/redux';
import { Button } from 'shared/view/elements';
import { INote } from 'shared/types/models';
import { useOnStateChange, isCommunicationComplete } from 'shared/helpers/redux';
import { NOTE_DEFAULT_BODY, NOTE_DEFAULT_TITLE } from 'features/manageNote/constants';
import { GetProps } from 'shared/types/utils';

import { selectors, actions } from '../../../redux';

import './CreateNoteButton.scss';

interface IStateProps {
  creatingNote: ICommunication;
  note: INote | null;
}

type IActionsDispatch = typeof actionsDispatch;

interface IOwnProps {
  children?: React.ReactNode;
  onCreate(noteId: string): void;
}

type IProps = IOwnProps & IActionsDispatch & IStateProps & GetProps<typeof Button>;
const CreateNoteButton = (props: IProps) => {
  const { children, onCreate, createNote, creatingNote, note, ...buttonProps } = props;

  const create = React.useCallback(() => {
    createNote({ title: NOTE_DEFAULT_TITLE, body: NOTE_DEFAULT_BODY });
  }, []);

  useOnStateChange(creatingNote, isCommunicationComplete, () => { note && onCreate(note.id); });

  return <Button onClick={create} disabled={creatingNote.isRequesting} {...buttonProps}>{children}</Button>;
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    creatingNote: selectors.selectCommunication(state, 'creatingNote'),
    note: selectors.selectNote(state),
  };
}

const actionsDispatch = {
  createNote: actions.createNote,
};

export default connect(mapState, actionsDispatch)(CreateNoteButton);
