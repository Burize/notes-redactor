import * as React from 'react';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';

import * as modules from 'modules';
import { defaultRoute } from 'modules/routes';
import 'shared/styles/fonts/index.scss';

import configureStore from './configure/configureStore';

import 'semantic-ui-css/semantic.min.css';

// import './registerWorkers';
import './App.scss';

const { store } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {Object.values(modules).map(module => module.getRoutes())}
          <Redirect to={defaultRoute} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
