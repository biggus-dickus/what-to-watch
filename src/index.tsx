// Vendor
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {compose} from 'recompose';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

// Types
import {Store} from 'redux'; // eslint-disable-line

// Store & Api
import {createAPI} from './api/api';
import {Operation} from './store/operations';
import rootReducer from './store/reducers';

// Components
import App from './components/app/app';
import ScrollToTop from './hocs/scroll-to-top';

declare const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (params: object) => any;


const api = createAPI((dispatchFunc) => store.dispatch(dispatchFunc));

// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
const composeEnhancers = (__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)));

const store: Store = createStore(rootReducer, enhancer);


store.dispatch(Operation.loadMovies());
store.dispatch(Operation.getUserData()).then(() => init());

function init(): void {
  ReactDOM.render(
      <Provider {...{store}}>
        <Router>
          <ScrollToTop><App /></ScrollToTop>
        </Router>
      </Provider>,
      document.getElementById(`root`) as HTMLElement
  );
}
