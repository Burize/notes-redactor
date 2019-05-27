import * as React from 'react';
import { block } from 'bem-cn';

import './Layout.scss';

const b = block('layout');

class Layout extends React.PureComponent {
  public render() {
    const { children } = this.props;
    return (
      <div className={b()}>
        <div className={b('content')}>{children}</div>
      </div>
    );
  }
}

export default Layout;
