import React from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';


// Prevent active html links from linking on themselves
const WrappingLink = (props) => {
  const {isEqualCurrentPath, to, children, ...rest} = props;

  return (isEqualCurrentPath) ?
    <span {...rest}>{children}</span> :
    <Link to={to} {...rest}>{children}</Link>;
};

WrappingLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  isEqualCurrentPath: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired
};

export default WrappingLink;
