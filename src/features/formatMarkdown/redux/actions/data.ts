import * as NS from '../../namespace';

export function setMarkdown(payload: NS.ISetMarkdown['payload']): NS.ISetMarkdown {
  return {
    type: 'FORMAT_MARKDOWN:SET_MARKDOWN',
    payload,
  };
}
