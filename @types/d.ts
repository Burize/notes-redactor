declare module "file-loader*" {
  const pathToFile: string;
  export = pathToFile;
}

declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
