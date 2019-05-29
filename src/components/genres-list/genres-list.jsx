import React from 'react';
import PropTypes from 'prop-types';

import GenresListItem from './list-item/genres-list-item';


const GenresList = ({genres, currentGenre, onGenreChange}) => {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) =>
        <GenresListItem
          key={genre}
          isActive={genre === currentGenre}
          {...{genre, onGenreChange}} />)}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired
};

export default GenresList;
