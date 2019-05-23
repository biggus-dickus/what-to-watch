import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import rootReducer from './store/reducer';

import {films} from './mocks/films';
import {Genre} from './mocks/genres';

import App from './components/app/app';


const store = createStore(rootReducer);

ReactDOM.render(
    <Provider {...{store}}>
      <App films={films} genres={Object.values(Genre)} />
    </Provider>,
    document.getElementById(`root`)
);
