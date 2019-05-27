import * as React from 'react';
import { block } from 'bem-cn';

import './RawMarkdown.scss';

interface IProps {
  value: string;
  onChange(text: string): void;
}

const b = block('raw-markdown');

function RawMarkdown(props: IProps) {
  const { value, onChange } = props;

  const onMarkdownChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
    [],
  );

  return (
    <div className={b()}>
      <textarea className={b('text-field')} value={value} onChange={onMarkdownChange} rows={15} cols={50} />
    </div>
  );
}

export default RawMarkdown;
