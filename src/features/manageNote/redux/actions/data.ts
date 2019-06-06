import * as NS from '../../namespace';

export function updateNote(payload: NS.IUpdateNote['payload']): NS.IUpdateNote {
  return {
    type: 'MANAGE_NOTE:UPDATE_NOTE',
    payload,
  };
}
