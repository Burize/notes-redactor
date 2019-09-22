import * as React from 'react';

import { block } from 'shared/helpers/bem';

import { IParsedNote } from '../../../namespace';

import './Note.scss';

interface IProps {
  note: IParsedNote;
  active?: boolean;
  onSelect(id: string): void;
}

const b = block('note');

function NotesList(props: IProps) {
  const { note: { id, title, parsedBody }, onSelect, active } = props;

  const selectHandler = React.useCallback(() => { onSelect(id); }, [id]);

  return (
    <div className={b({ active })} onClick={selectHandler}>
      <h3 className={b('title')}>{title}</h3>
      <div className={b('body')} dangerouslySetInnerHTML={{ __html: parsedBody }} />
    </div>
  );
}

export default NotesList;
