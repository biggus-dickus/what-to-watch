import * as React from 'react';
import PropTypes from 'prop-types';

import RouteConfig from '../../../config/routes';
import WrappingLink from '../../../hocs/wrapping-link';


export const Logo = ({pathname, bemModifier = ``}) => (
  <div className="logo">
    <WrappingLink
      to={RouteConfig.INDEX}
      isEqualCurrentPath={pathname === RouteConfig.INDEX}
      className={`logo__link ${bemModifier}`.trim()}>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </WrappingLink>
  </div>
);

Logo.propTypes = {
  bemModifier: PropTypes.string,
  pathname: PropTypes.string.isRequired
};

export default Logo;
