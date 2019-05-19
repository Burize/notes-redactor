import { IPlainAction, IAction, IPlainFailAction } from 'shared/types/redux';

type IGenericPlainAction = IPlainAction<string>;
type IGenericAction = IAction<string, any>;
type IGenericPlainFailAction = IPlainFailAction<string>;

type NullaryAC<A extends IGenericPlainAction> = () => A;
type UnaryAC<A extends IGenericAction> = (payload: A['payload']) => A;

type NullaryFailedAC<A extends IGenericPlainFailAction> = (error: A['error']) => A;

interface ICommunicationActionCreators<E, C, F> {
  execute: E;
  completed: C;
  failed: F;
}

// Partial payload actions

function makeCommunicationActionCreators<
  E extends IGenericAction, C extends IGenericAction, F extends IGenericPlainFailAction
>(
  executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<UnaryAC<E>, UnaryAC<C>, NullaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IGenericAction, C extends IGenericPlainAction, F extends IGenericPlainFailAction
>(
  executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<UnaryAC<E>, NullaryAC<C>, NullaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IGenericPlainAction, C extends IGenericAction, F extends IGenericPlainFailAction
>(
  executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<NullaryAC<E>, UnaryAC<C>, NullaryFailedAC<F>>;

function makeCommunicationActionCreators<
  E extends IGenericPlainAction, C extends IGenericPlainAction, F extends IGenericPlainFailAction
>(
  executeType: E['type'], completeType: C['type'], failType: F['type'],
): ICommunicationActionCreators<NullaryAC<E>, NullaryAC<C>, NullaryFailedAC<F>>;

function makeCommunicationActionCreators(executeType: string, completeType: string, failType: string) {
  return {
    execute: (payload: any) => {
      return { type: executeType, payload };
    },
    completed: (payload: any) => {
      return { type: completeType, payload };
    },
    failed: (error: any, payload: any) => {
      return { type: failType, error, payload };
    },
  };
}

export default makeCommunicationActionCreators;
