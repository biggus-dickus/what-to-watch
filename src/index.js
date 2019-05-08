import React from 'react';
import ReactDOM from 'react-dom';

import {films} from './mocks/films';
import {genres} from './mocks/genres';

import App from './components/app/app';

ReactDOM.render(
    <App {...{films, genres}} />,
    document.getElementById(`root`)
);
