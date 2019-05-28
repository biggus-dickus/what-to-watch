import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import rootReducer from './store/reducer';

import App from './components/app/app';


const store = createStore(rootReducer);

ReactDOM.render(
    <Provider {...{store}}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
