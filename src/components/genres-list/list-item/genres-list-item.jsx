import React from 'react';
import PropTypes from 'prop-types';

import withActiveItem from '../../../hocs/with-active-item';


const GenresListItem = (props) => {
  const {item, isActive, onGenreChange} = props;

  const classList = [`catalog__genres-item`];

  if (isActive) {
    classList.push(`catalog__genres-item--active`);
  }

  return (
    <li className={classList.join(` `)}>
      <a href={(isActive) ? null : `#${item.replace(/ /g, `-`)}`}
        className="catalog__genres-link"
        onClick={onGenreChange.bind(null, item)}>
        {item}
      </a>
    </li>
  );
};

GenresListItem.propTypes = {
  item: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onGenreChange: PropTypes.func.isRequired
};

export default withActiveItem(GenresListItem);
