import * as React from 'react';

import {Film} from '../../types'; // eslint-disable-line
import FilmCard from '../film-card/film-card';


interface Props {
  films: Film[]
}

const FilmsList = ({films}: Props): React.ReactElement => (
  films.length ? (
    <div className="catalog__movies-list">
      {films.map((film) => <FilmCard key={film.id} {...film} />)}
    </div>
  ) : null
);

export default FilmsList;
