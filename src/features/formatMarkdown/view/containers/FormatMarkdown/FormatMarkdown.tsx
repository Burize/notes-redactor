import * as React from 'react';
import { connect } from 'react-redux';
import { block } from 'bem-cn';

import { IAppReduxState } from 'shared/types/redux';

import { selectors, actions } from '../../../redux';

import './FormatMarkdown.scss';
import { parseMarkdown, markdownManager } from 'services/markdown';

import { ParsedMarkdown, RawMarkdown } from '../../components';
import { MOCK_ID } from 'features/formatMarkdown/constants';

const b = block('format-markdown');

interface IStateProps {
  markdown: string | null;
}

type IActionsDispatch = typeof actionsDispatch;

type IProps = IActionsDispatch & IStateProps;
const FormatMarkdown = (props: IProps) => {
  const { markdown, setMarkdown } = props;
  const [parsedMarkdown, setParsedMarkdown] = React.useState('');

  if (!markdown) {
    return null;
  }

  React.useEffect(() => {
    (async () => {
      const handledMarkdown = await markdownManager.parseMarkdown(markdown);
      setParsedMarkdown(handledMarkdown);
    })();
  }, [markdown]);
  const onMarkdownChange = React.useCallback((value: string) => setMarkdown({ id: MOCK_ID, markdown: value }), []);

  return (
    <div className={b()}>
      <RawMarkdown value={markdown} onChange={onMarkdownChange} />
      <ParsedMarkdown parsedMarkdown={parsedMarkdown} />
    </div>
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

export default connect(mapState, actionsDispatch)(FormatMarkdown);
