import React from 'react';
import PropTypes from 'prop-types';


export const GenresList = ({genres, currentGenre, onGenreChange}) => {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => {
        const classList = [`catalog__genres-item`];
        let isActive = false;

        if (genre === currentGenre) {
          classList.push(`catalog__genres-item--active`);
          isActive = true;
        }

        return (
          <li key={genre} className={classList.join(` `)}>
            <a href={(isActive) ? null : `#${genre.replace(/ /g, `-`)}`}
              className="catalog__genres-link"
              onClick={onGenreChange.bind(null, genre)}>
              {genre}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired
};

export default GenresList;
