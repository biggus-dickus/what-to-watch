import React from 'react';
import PropTypes from 'prop-types';

import getDisplayName from '../utilities/get-display-name';
import {isPrimitive} from '../utilities/helpers';


const checkIfActive = (currentItem, activeItem, propToCheck) => {
  if (typeof currentItem === `object` && propToCheck) {
    return currentItem[propToCheck] === activeItem;
  }

  return currentItem === activeItem;
};

const withActiveItem = (WrappedComponent) => {
  const WithActiveItem = (props) => {
    const {items, activeItemName, activePropName, ...rest} = props;

    let uniqueKey = ``;
    const itemCanBeKey = (new Set(items).size === items.length && items.every(isPrimitive));

    return items.map((item, i) => {
      if (itemCanBeKey) {
        uniqueKey = item;
      } else if (typeof item === `object` && `id` in item) {
        uniqueKey = item.id;
      } else {
        uniqueKey = i;
      }

      const isActive = checkIfActive(item, activeItemName, activePropName);

      return <WrappedComponent key={uniqueKey} {...{isActive, item}} {...rest} />;
    });
  };

  WithActiveItem.propTypes = {
    items: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ])).isRequired,
    activeItemName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]).isRequired,
    activePropName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ])
  };

  WithActiveItem.displayName = `WithActiveItem(${getDisplayName(WrappedComponent)})`;

  return WithActiveItem;
};

export default withActiveItem;
