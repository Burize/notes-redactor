import { combineReducers } from 'redux';

import * as NS from '../../namespace';

import { communicationReducer } from './communication';
import { dataReducer } from './data';

export default combineReducers<NS.IReduxState>({
  communication: communicationReducer,
  data: dataReducer,
});
