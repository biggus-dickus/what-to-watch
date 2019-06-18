import * as React from 'react';

import {Film, Location} from '../../types'; // eslint-disable-line

import NoMatch from '../no-match/no-match';

interface Props {
  availableMovies: Film[],
  computedMatch: any,
  exact: boolean,
  location: Location
}

const getFilmById = (films: Film[], id: number): Film | undefined => films.find((film) => film.id === id);


const FilmDetails = (props: Props) => {
  const {computedMatch, availableMovies} = props;

  const film = getFilmById(availableMovies, +computedMatch.params.id);

  return (film) ? <mark>Das ist Film yopta</mark> : <NoMatch />;
};

export default FilmDetails;
