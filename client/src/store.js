import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer} from './reducers/hungry';
export default (createStore(reducer, applyMiddleware(thunk)));