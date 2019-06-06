import { Reducer } from 'redux';
import { SagaIterator } from 'redux-saga';

import { namespace as ManageNoteNamespace } from 'features/manageNote';
import { namespace as ShowNoteseNamespace } from 'features/showNotes';

import { Api } from 'services/api';

export interface IReduxEntry<EntryState> {
  reducer: Reducer<EntryState>;
  sagas?: RootSaga[];
}
export type RootSaga = (deps: IDependencies) => SagaIterator;

export interface IAppReduxState {
  manageNote: ManageNoteNamespace.IReduxState;
  showNotes: ShowNoteseNamespace.IReduxState;
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
