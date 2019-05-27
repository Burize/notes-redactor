import Worker from 'worker-loader!./workers/parseMarkdownWorker';
import PromiseWorker from 'promise-worker';

class MarkdownManager {
  private worker: PromiseWorker;
  constructor() {
    this.worker = new PromiseWorker(new Worker());
  }

  public parseMarkdown(rawText: string) {
    return this.worker.postMessage(rawText);
  }
}

export default new MarkdownManager();
