import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'EDIT_NOTE:LOAD_NOTE_BY_ID_COMPLETE': {
      const { note } = action.payload;
      return { ...state, note: { ...note } };
    }
    case 'EDIT_NOTE:UPDATE_NOTE': {
      const note = action.payload;
      if (!state.note) {
        return state;
      }
      return { ...state, note: { ...state.note, ...note } };
    }
    default: return state;
  }
}
