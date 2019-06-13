import * as React from 'react';
import PropTypes from 'prop-types';

import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';


const Catalog = (props) => {
  const {currentGenre, genres = [], movies, onGenreChange} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      {genres.length ? <GenresList {...{currentGenre, genres, onGenreChange}} /> : null}

      <FilmsList films={movies} />

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
};

Catalog.propTypes = {
  currentGenre: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGenreChange: PropTypes.func
};

export default Catalog;
