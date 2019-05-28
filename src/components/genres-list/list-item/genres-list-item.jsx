import React from 'react';
import PropTypes from 'prop-types';

import withActiveItem from '../../../hocs/with-active-item';


const genresListItem = ({genre, isActive, onGenreChange}) => {
  const classList = [`catalog__genres-item`];

  if (isActive) {
    classList.push(`catalog__genres-item--active`);
  }

  return (
    <li className={classList.join(` `)}>
      <a href={(isActive) ? null : `#${genre.replace(/ /g, `-`)}`}
        className="catalog__genres-link"
        onClick={onGenreChange.bind(null, genre)}>
        {genre}
      </a>
    </li>
  );
};

genresListItem.propTypes = {
  genre: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onGenreChange: PropTypes.func.isRequired
};

export default withActiveItem(genresListItem);
