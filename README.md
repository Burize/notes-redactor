## NOTER REDACTOR 

Note redactor for creating and managing notes. Notes writes at markdown and parses at same time.


This is PWA app:
- All fetches handle by SW and static assets has been cached;
- It has storage for opportunity to use app when there is no network connection. When network connection appears, all unsaved actions send for backend server via sync api;

### Used features

- React/Redux;
- Typescript;
- [Redux-Saga](https://github.com/reduxjs/redux-thunk) for handle side-effects at redux;
- [Axios](https://github.com/axios/axios) for handle http actions;
- [Semantic UI](https://react.semantic-ui.com/) as components kits;
- IndexedDB as offline storage;
- Webworker(dedicated) for parse markdown / ServiceWorker for cache assets and handle fetch offline.

### Project launch
For working at online mode, you need the [back-end rest server](https://github.com/Burize/multi-step-form-backend). However, you can launch project without it and working offline: (there is empty notes list and all next actions will stored at storage)

### NPM scripts

- ```npm run dev``` for development environment in watch mode
- ```npm run prod``` for production environment in watch mode
- ```npm run analyze:dev``` for bundle analyzing



### TODO
- Complete layout: parse markdown at notes list and make mobile variant;
- Add manifest for offer to add app icon for mobile screen.