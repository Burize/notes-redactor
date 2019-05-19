import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {

    case 'CREATE_DOMAIN:LOAD_COUNTRIES_COMPLETE': {
      const { countries } = action.payload;
      return { ...state, countries: [...countries] };
    }
    default: return state;
  }
}
