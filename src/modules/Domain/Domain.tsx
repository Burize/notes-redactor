import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { IModule } from 'shared/types/app';
import { routes } from 'modules/routes';

import { Domain } from './view';

const DomainModule: IModule = {
  getRoutes() {
    return (
      <Route key="createDomain" path={routes.domain}>
        <Switch>
          <Route path={routes.domain} component={Domain} />
          <Redirect to={routes.domain} />
        </Switch>
      </Route>
    );
  },
};

export default DomainModule;
