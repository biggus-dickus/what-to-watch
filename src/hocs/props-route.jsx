import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';


const PropsRoute = (props) => {
  const {path, component: Component, ...rest} = props;

  return <Route
    path={path}
    render={() => <Component {...rest}>{props.children}</Component>} />;
};

PropsRoute.propTypes = {
  children: PropTypes.func,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

export default PropsRoute;
