import * as React from 'react';
import { Route } from 'react-router-dom';

import { IModule } from 'shared/types/app';
import { routes } from 'modules/routes';

import { Redactor } from './view';

const DomainModule: IModule = {
  getRoutes() {
    return [
      <Route key="redactor" path={routes.redactor.path} component={Redactor} />,
    ];
  },
};

export default DomainModule;
