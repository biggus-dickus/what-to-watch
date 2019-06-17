import * as React from 'react';
import {Location} from 'history'; // eslint-disable-line
import {Redirect, Route} from 'react-router-dom';

import {RouteWithProps} from '../types'; // eslint-disable-line

import PropsRoute from './props-route';

interface Props extends RouteWithProps {
  isPrivate: boolean,
  location?: Location,
  redirectTo: string
}


const PrivateRoute = ({isPrivate, redirectTo, component, ...rest}: Props) => {
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

export default PrivateRoute;
