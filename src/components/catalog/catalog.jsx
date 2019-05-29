import React from 'react';
import PropTypes from 'prop-types';

import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';


export const Catalog = (props) => {
  const {currentGenre, genres, movies, onGenreChange} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList {...{currentGenre, genres, onGenreChange}} />

      <FilmsList films={movies} />

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
};

Catalog.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGenreChange: PropTypes.func.isRequired
};

export default Catalog;
