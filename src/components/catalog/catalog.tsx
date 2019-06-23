import * as React from 'react';

import {Film, Genre} from '../../types'; // eslint-disable-line

import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';


interface Props extends Genre {
  movies: Array<Film>
}


const Catalog = (props: Props): React.ReactElement => {
  const {currentGenre, genres, movies, onGenreChange} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      {genres.length ? <GenresList {...{currentGenre, genres, onGenreChange}} /> : null}

      <FilmsList films={movies} />
    </section>
  );
};

export default Catalog;
