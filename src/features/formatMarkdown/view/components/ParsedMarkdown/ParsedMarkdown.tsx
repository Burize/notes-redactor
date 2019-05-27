import * as React from 'react';
import { block } from 'bem-cn';

// import './ParsedSummary.styl';

interface IProps {
  parsedMarkdown: string;
}

const b = block('parsed-markdown');

function ParsedMarkdown(props: IProps) {
  const { parsedMarkdown } = props;
  return (
    <div className={b()}>
      <div dangerouslySetInnerHTML={{ __html: parsedMarkdown }} />
    </div>
  );
}

export default ParsedMarkdown;
