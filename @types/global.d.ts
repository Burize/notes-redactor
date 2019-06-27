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

declare module "*.svg" {
  const content: string;
  export default content;
}
declare module '*.png';
declare module '*.jpg';

declare module 'serviceworker-webpack-plugin';
declare module 'favicons-webpack-plugin';

declare var serviceWorkerOption: {
  assets: string[],
};