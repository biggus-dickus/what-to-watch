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

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.dispatch(Operation.loadMovies());

ReactDOM.render(
    <Provider {...{store}}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
