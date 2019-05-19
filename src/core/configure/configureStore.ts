import { composeWithDevTools } from 'redux-devtools-extension';
import { compose, applyMiddleware, createStore, Middleware, Store, combineReducers, Reducer } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { Api } from 'services/api';
import { reduxEntry as createDomainReduxEntry } from 'features/createDomain';
import { IAppReduxState, IDependencies, IReduxEntry, RootSaga } from 'shared/types/redux';

import getEnvParams from 'shared/helpers/getEnvParams';

const { env } = getEnvParams();

interface IStoreData {
  store: Store<IAppReduxState>;
}

function configureStore(): IStoreData {

  const composeEnhancers = env === 'development' ? composeWithDevTools({}) : compose;

  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware[] = [sagaMiddleware];

  const store: Store<IAppReduxState> =
    createStore(
      (state: IAppReduxState) => state,
      composeEnhancers(applyMiddleware(...middlewares)),
    );

  const dependencies: IDependencies = { api: new Api() };

  const connectedReducers = {} as { [key in keyof IAppReduxState]: Reducer };

  const entries: Record<keyof IAppReduxState, IReduxEntry<any>> = {
    createDomain: createDomainReduxEntry,
  };

  Object.keys(entries).forEach(connectEntryToStore);

  function connectEntryToStore(featureKey: keyof IAppReduxState) {

    const { reducer, sagas } = entries[featureKey];

    if (reducer) {
      connectedReducers[featureKey] = reducer;
      store.replaceReducer(combineReducers(connectedReducers));
    }

    if (sagas) {
      sagas.forEach((saga: RootSaga) => {
        sagaMiddleware.run(saga, dependencies);
      });
    }
  }

  return { store };
}

export { IStoreData };
export default configureStore;
