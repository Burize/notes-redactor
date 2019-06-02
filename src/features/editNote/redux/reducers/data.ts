import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {

    case 'FORMAT_MARKDOWN:SET_MARKDOWN': {
      const { id, markdown } = action.payload;
      return { ...state, markdowns: { ...state.markdowns, [id]: markdown } };
    }
    default: return state;
  }
}
