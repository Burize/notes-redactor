import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {

    case 'SHOW_NOTES:LOAD_NOTES_COMPLETE': {
      const { notes } = action.payload;
      return { ...state, notes: [...notes] };
    }
    default: return state;
  }
}
