import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/styles/GlobalStyles.scss';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import "babel-polyfill";

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
