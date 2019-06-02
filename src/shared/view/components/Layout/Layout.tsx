import * as React from 'react';
import { block } from 'bem-cn';

import { Menu, Button, Container } from 'shared/view/elements';

import './Layout.scss';

const b = block('layout');

interface IProps {
  header: React.ReactElement;
  children: React.ReactNode;
}

export default function (props: IProps) {
  const { children, header } = props;

  return (
    <div className={b()}>
      {header}
      <Container>{children}</Container>
    </div>
  );
}
