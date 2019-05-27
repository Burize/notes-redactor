import parseMarkdown from '../helpers/parseMarkdown';
import registerPromiseWorker from 'promise-worker/register';

registerPromiseWorker((message: string) => {
  return parseMarkdown(message);
});
