import * as React from 'react';
import { block } from 'bem-cn';

import { FormatMarkdown } from 'features/formatMarkdown';
import { Layout } from 'shared/view';

const b = block('Domain');

class Redactor extends React.PureComponent {
  public render() {

    return (
      <Layout>
        <div className={b()}><FormatMarkdown /></div>
      </Layout>
    );
  }
}

export default Redactor;
