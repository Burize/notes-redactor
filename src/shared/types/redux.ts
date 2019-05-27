import { Reducer } from 'redux';
import { SagaIterator } from 'redux-saga';

import { namespace as FormatMarkdownNamespace } from 'features/formatMarkdown';
import { Api } from 'services/api';

export interface IReduxEntry<EntryState> {
  reducer: Reducer<EntryState>;
  sagas?: RootSaga[];
}
export type RootSaga = (deps: IDependencies) => SagaIterator;

export interface IAppReduxState {
  formatMarkdown: FormatMarkdownNamespace.IReduxState;
}

export interface IPlainAction<T> {
  type: T;
}

export interface IAction<T, P> extends IPlainAction<T> {
  payload: P;
}

export interface IPlainFailAction<T, E = string> extends IPlainAction<T> {
  error: E;
}

export interface ICommunication<E = string> {
  isRequesting: boolean;
  error: E;
}

export interface IDependencies {
  api: Api;
}
