import React from 'react';
import PropTypes from 'prop-types';

import getDisplayName from '../utilities/get-display-name';

const withActiveItem = (WrappedComponent) => {
  const WithActiveItem = (props) => {
    const {isActive, ...rest} = props;

    return <WrappedComponent {...{isActive}} {...rest} />;
  };

  WithActiveItem.propTypes = {
    isActive: PropTypes.bool.isRequired
  };

  WithActiveItem.displayName = `WithActiveItem(${getDisplayName(WrappedComponent)})`;

  return WithActiveItem;
};

export default withActiveItem;
