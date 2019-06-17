import * as React from 'react';
import {Route} from 'react-router-dom';

import {RouteWithProps} from '../types'; // eslint-disable-line


const PropsRoute = (props: RouteWithProps) => {
  const {path, component: Component, ...rest} = props;

  return <Route
    path={path}
    render={() => <Component {...rest}>{props.children}</Component>} />;
};

export default PropsRoute;
