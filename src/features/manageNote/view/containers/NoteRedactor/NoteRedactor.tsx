import * as React from 'react';
import { connect } from 'react-redux';

import { block } from 'shared/helpers/bem';

import { INote } from 'shared/types/models';
import { markdownManager } from 'services/markdown';
import { IAppReduxState, ICommunication } from 'shared/types/redux';
import { Grid, Segment } from 'shared/view/elements';

import { selectors, actions } from '../../../redux';
import { Note, RawMarkdown } from '../../components';

import './EditNote.scss';
import { Loader, Dimmer } from 'semantic-ui-react';

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
const EditNote = (props: IProps) => {
  const { note, updateNote, noteId, loadNote, loadingNote } = props;
  const [parsedMarkdown, setParsedMarkdown] = React.useState('');

  React.useEffect(() => {
    noteId && loadNote({ id: noteId });
  }, [noteId]);

  const makeChangeFieldHandler = (key: keyof INote) => (value: string) => updateNote({ [key]: value });

  const onTitleChange = React.useMemo(() => makeChangeFieldHandler('title'), []);
  const onMarkdownChange = React.useMemo(() => makeChangeFieldHandler('body'), []);

  const parseMarkdown = async (markdown: string) => {
    const handledMarkdown = await markdownManager.parseMarkdown(markdown);
    setParsedMarkdown(handledMarkdown);
  };

  React.useEffect(() => {
    note && parseMarkdown(note.body); // try make with body at second arg
  }, [note]);

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
                <RawMarkdown value={note.body} onChange={onMarkdownChange} />
              </Grid.Column>
              <Grid.Column>
                <Note title={note.title} onTitleChange={onTitleChange} body={parsedMarkdown} />
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

export default connect(mapState, actionsDispatch)(EditNote);
