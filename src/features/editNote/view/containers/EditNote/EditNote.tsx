import * as React from 'react';
import { connect } from 'react-redux';
import { block } from 'bem-cn';

import { markdownManager } from 'services/markdown';
import { IAppReduxState } from 'shared/types/redux';
import { Grid } from 'shared/view/elements';

import { selectors, actions } from '../../../redux';
import { Note, RawMarkdown } from '../../components';
import { MOCK_ID } from '../../../constants';

import './EditNote.scss';

const b = block('format-markdown');

interface IStateProps {
  markdown: string | null;
}

type IActionsDispatch = typeof actionsDispatch;

type IProps = IActionsDispatch & IStateProps;
const EditNote = (props: IProps) => {
  const { markdown, setMarkdown } = props;
  const [parsedMarkdown, setParsedMarkdown] = React.useState('');
  const [noteTitle, setNoteTitle] = React.useState('New amazing note');

  if (!markdown) {
    return null;
  }

  const onMarkdownChange = React.useCallback((value: string) => setMarkdown({ id: MOCK_ID, markdown: value }), []);
  React.useEffect(() => {
    (async () => {
      const handledMarkdown = await markdownManager.parseMarkdown(markdown);
      setParsedMarkdown(handledMarkdown);
    })();
  }, [markdown]);

  return (
    <Grid columns="equal" className={b()}>
      <Grid.Row>
        <Grid.Column>
          <RawMarkdown value={markdown} onChange={onMarkdownChange} />
        </Grid.Column>
        <Grid.Column>
          <Note title={noteTitle} onTitleChange={setNoteTitle} body={parsedMarkdown} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    markdown: selectors.selectMarkdownById(state, MOCK_ID),
  };
}

const actionsDispatch = {
  setMarkdown: actions.setMarkdown,
};

export default connect(mapState, actionsDispatch)(EditNote);
