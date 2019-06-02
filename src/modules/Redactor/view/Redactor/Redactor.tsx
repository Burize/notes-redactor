import * as React from 'react';
import { block } from 'bem-cn';

import { EditNote } from 'features/editNote';
import { Layout } from 'shared/view';

import { Header } from 'modules/shared';

const b = block('Domain');

class Redactor extends React.PureComponent {
  public render() {

    return (
      <Layout header={<Header />}>
        <div className={b()}><EditNote /></div>
      </Layout>
    );
  }
}

export default Redactor;
