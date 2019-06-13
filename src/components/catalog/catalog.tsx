import * as React from 'react';

import {Film, Genre} from '../../types/types'; // eslint-disable-line

import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';


interface Props extends Genre {
  movies: Array<Film>
}


const Catalog = (props: Props) => {
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

export default Catalog;
