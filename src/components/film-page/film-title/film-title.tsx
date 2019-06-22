import * as React from 'react';

interface Props {
  name: string,
  genre: string,
  released: number,
  ish1?: boolean
}

const FilmTitle = ({name, genre, released, ish1 = false}: Props): React.ReactElement => (
  <>
    {ish1 ? <h1 className="movie-card__title">{name}</h1> : <h2 className="movie-card__title">{name}</h2>}
    <p className="movie-card__meta">
      <span className="movie-card__genre">{genre}</span>
      <span className="movie-card__year">{released}</span>
    </p>
  </>
);

export default FilmTitle;
