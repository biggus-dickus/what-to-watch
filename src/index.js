import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import rootReducer from './store/reducer';

import {Genre} from './mocks/genres';

import App from './components/app/app';


const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider {...{store}}>
      <App genres={Object.values(Genre)} />
    </Provider>,
    document.getElementById(`root`)
);
