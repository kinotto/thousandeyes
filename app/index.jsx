import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './reducers';
import {rootEpic} from './epic';
import {createEpicMiddleware} from 'redux-observable';
import '../style/main.scss';
// http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);


ReactDOM.render(
  <Provider store={store}>
    <Router/>
  </Provider>
  , document.querySelector('.output'));
