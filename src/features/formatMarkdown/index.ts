import { IReduxEntry } from 'shared/types/redux';
import { reducer, rootSaga } from './redux';

import * as namespace from './namespace';

export { namespace };
export * from './view';

export const reduxEntry: IReduxEntry<namespace.IReduxState> = {
  reducer,
  sagas: [rootSaga],
};
