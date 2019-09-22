import * as React from 'react';

import { Input } from 'shared/view/elements';
import { block } from 'shared/helpers/bem';

import './Note.scss';

interface IProps {
  title: string;
  body: string;
  onTitleChange(title: string): void;
}

const b = block('editable-note');

function ParsedMarkdown(props: IProps) {
  const { body, title, onTitleChange } = props;

  const changeTitleHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onTitleChange(e.target.value),
    [onTitleChange],
  );

  return (
    <div className={b()}>
      <Input
        size="massive"
        className={b('name')}
        transparent
        placeholder="New amazing note"
        value={title}
        onChange={changeTitleHandler}
      />
      <div className={b('body')} dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}

export default ParsedMarkdown;
