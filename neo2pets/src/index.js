import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
     <Route path='/' component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
