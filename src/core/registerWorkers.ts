// import * as rootWorker from 'file-loader?name=[name].js!./workers/rootWorker';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const registration = runtime.register();
    // navigator.serviceWorker.register(rootWorker).then(registration => {
    //   console.log('SW registered: ', registration);
    // }).catch(registrationError => {
    //   console.log('SW registration failed: ', registrationError);
    // });
  });
}
