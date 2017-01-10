// Import just the polyfills we need - core-js is large
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './views/app/app';

ReactDOM.render(
  <Application />, document.getElementById('container')
);