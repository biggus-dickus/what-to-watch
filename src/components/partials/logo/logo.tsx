import * as React from 'react';

import RouteConfig from '../../../config/routes';
import WrappingLink from '../../../hocs/wrapping-link';

interface Props {
  bemModifier?: string,
  pathname: string
}


export const Logo = ({pathname, bemModifier = ``}: Props): React.ReactElement => (
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

export default Logo;
