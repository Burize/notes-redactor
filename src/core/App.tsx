import * as React from 'react';
import { Provider } from 'react-redux';
import { Switch, Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import * as modules from 'modules';
import { defaultRoute } from 'modules/routes';
import 'shared/styles/fonts/index.scss';

import configureApp from './configure/configureApp';

import 'semantic-ui-css/semantic.min.css';

import './registerWorkers';
import './App.scss';

export const history = createBrowserHistory();

const { store } = configureApp(history);

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          {Object.values(modules).map(module => module.getRoutes())}
          <Redirect to={defaultRoute.make()} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
