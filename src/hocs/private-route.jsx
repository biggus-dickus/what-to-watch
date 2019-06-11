import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import PropsRoute from './props-route';


const PrivateRoute = ({isPrivate, redirectTo, component, ...rest}) => {
  if (isPrivate) {
    return (
      <Route
        {...rest}
        render={(props) =>
          <Redirect
            to={{
              pathname: redirectTo,
              state: {from: props.location}
            }}
          />
        }
      />
    );
  }

  return <PropsRoute {...{component}} {...rest} />;
};

PrivateRoute.propTypes = {
  isPrivate: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  location: PropTypes.object,
  redirectTo: PropTypes.string.isRequired
};

export default PrivateRoute;
