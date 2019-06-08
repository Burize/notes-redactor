import * as React from 'react';
import { connect } from 'react-redux';

import { block } from 'shared/helpers/bem';

import { INote } from 'shared/types/models';
import { markdownManager } from 'services/markdown';
import { IAppReduxState, ICommunication } from 'shared/types/redux';
import { Grid, Segment, Loader, Dimmer } from 'shared/view/elements';
import { useDebounce } from 'shared/helpers/react';

import { selectors, actions } from '../../../redux';
import { Note, RawMarkdown } from '../../components';

import './NoteRedactor.scss';
import useOnChangeState from 'shared/helpers/redux/useOnStateChange';
import { isCommunicationComplete } from 'shared/helpers/redux';

const b = block('edit-note');

interface IOwnProps {
  noteId: string;
}

interface IStateProps {
  note: INote | null;
  loadingNote: ICommunication;
}

type IActionsDispatch = typeof actionsDispatch;

type IProps = IOwnProps & IActionsDispatch & IStateProps;
const NoteRedactor = (props: IProps) => {
  const { note, updateNote, noteId, loadNote, loadingNote } = props;

  const [noteTitle, setNoteTitle] = React.useState('');
  const [noteBody, setNoteBody] = React.useState('');
  const [parsedMarkdown, setParsedMarkdown] = React.useState('');

  React.useEffect(() => {
    if (note && note.id === noteId) {
      return;
    }
    noteId && loadNote({ id: noteId });
  }, [noteId]);

  useOnChangeState(loadingNote, isCommunicationComplete, () => {
    if (note) { // handle if false
      setNoteTitle(note.title);
      setNoteBody(note.body);
    }
  });

  // maybe rework
  const debounceNoteTitle = useDebounce(noteTitle, 1000);
  const debounceNoteBody = useDebounce(noteBody, 1000);

  React.useEffect(() => {
    updateNote({ id: noteId, title: debounceNoteTitle, body: debounceNoteBody });
  }, [debounceNoteTitle, debounceNoteBody]);

  const parseMarkdown = async (markdown: string) => {
    const handledMarkdown = await markdownManager.parseMarkdown(markdown);
    setParsedMarkdown(handledMarkdown);
  };

  React.useEffect(() => {
    parseMarkdown(noteBody);
  }, [noteBody]);

  return (
    <Segment className={b()}>
      {loadingNote.isRequesting &&
        (
          <Dimmer active inverted>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        )}
      {!loadingNote.isRequesting && note &&
        (
          <Grid columns="equal" className={b()}>
            <Grid.Row>
              <Grid.Column>
                <RawMarkdown value={noteBody} onChange={setNoteBody} />
              </Grid.Column>
              <Grid.Column>
                <Note title={noteTitle} onTitleChange={setNoteTitle} body={parsedMarkdown} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
    </Segment>
  );
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    note: selectors.selectNote(state),
    loadingNote: selectors.selectCommunication(state, 'loadingNote'),

  };
}

const actionsDispatch = {
  updateNote: actions.updateNote,
  loadNote: actions.loadNote,
};

export default connect(mapState, actionsDispatch)(NoteRedactor);
