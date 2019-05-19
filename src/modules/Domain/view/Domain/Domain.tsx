import * as React from 'react';
import { block } from 'bem-cn';

import { DomainConfiguration } from 'features/createDomain';
import { Layout } from 'shared/view';

const b = block('Domain');

class Domain extends React.PureComponent {
  public render() {
    const { } = this.props;
    return (
      <Layout>
        <div className={b()}><DomainConfiguration /></div>
      </Layout>
    );
  }
}

export default Domain;
