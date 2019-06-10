import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import RouteConfig from '../config/routes';

import PropsRoute from './props-route';


const PrivateRoute = ({isPrivate, path, component, ...rest}) => {
  if (isPrivate) {
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
  }

  return <PropsRoute {...{path, component}} {...rest} />;
};

PrivateRoute.propTypes = {
  isPrivate: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  path: PropTypes.string.isRequired
};

export default PrivateRoute;
