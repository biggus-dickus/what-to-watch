import React from 'react';
import ReactDOM from 'react-dom';
import {compose} from 'recompose';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {createAPI} from './api/api';
import {Operation} from './store/operations';
import rootReducer from './store/reducers/index';

import App from './components/app/app';


const api = createAPI((...args) => store.dispatch(...args));

// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)));

const store = createStore(rootReducer, enhancer);


store.dispatch(Operation.getUserData());
store.dispatch(Operation.loadMovies());

ReactDOM.render(
    <Provider {...{store}}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
