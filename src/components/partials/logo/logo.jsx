import React from 'react';
import PropTypes from 'prop-types';


export const Logo = ({isHomePage, bemModifier = ``}) => (
  <div className="logo">
    <a className={`logo__link ${bemModifier}`.trim()} href={(isHomePage) ? null : `/`}>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </a>
  </div>
);

Logo.propTypes = {
  bemModifier: PropTypes.string,
  isHomePage: PropTypes.bool.isRequired
};

export default Logo;
