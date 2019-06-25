// Vendor
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {compose} from 'recompose';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

// Types
import {Store} from 'redux'; // eslint-disable-line

// Store & Api
import {createAPI} from './api/api';
import history from './history';
import {Operation} from './store/operations';
import rootReducer from './store/reducers';
import RouteConfig from './config/routes';

// Components
import App from './components/app/app';
import ScrollToTop from './hocs/scroll-to-top';

const api = createAPI(() => history.push(RouteConfig.SIGN_IN));

// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
const composeEnhancers = (window[`__REDUX_DEVTOOLS_EXTENSION_COMPOSE__`]) ?
  window[`__REDUX_DEVTOOLS_EXTENSION_COMPOSE__`]({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)));

const store: Store = createStore(rootReducer, enhancer);


store.dispatch(Operation.loadMovies());
store.dispatch(Operation.getUserData()).then(() => init());

function init(): void {
  ReactDOM.render(
      <Provider {...{store}}>
        <Router {...{history}}>
          <ScrollToTop><App /></ScrollToTop>
        </Router>
      </Provider>,
      document.getElementById(`root`) as HTMLElement
  );
}
