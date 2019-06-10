import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import RouteConfig from '../config/routes';

import PropsRoute from './props-route';


const PrivateRoute = ({isLoggedIn, path, component, ...rest}) => {
  if (isLoggedIn) {
    return <PropsRoute {...{path, component}} {...rest} />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        <Redirect
          to={{
            pathname: RouteConfig.SIGN_IN,
            state: {from: props.location}
          }}
        />
      }
    />
  );
};

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  path: PropTypes.string.isRequired
};

export default PrivateRoute;
