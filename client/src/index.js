import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import HungryList from './components/hungry-list';
import './index.css';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
   <HungryList />
  </Provider>,
  document.getElementById('root')
);
