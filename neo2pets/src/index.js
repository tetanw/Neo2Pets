import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Login from './components/Login';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Login/>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
