import * as React from 'react';
import FilmRating from "../film-rating/film-rating";

interface Props {
  description: string,
  director: string,
  rating: number,
  scoresCount: number,
  starring: string[]
}

const FilmOverview = (props: Props): React.ReactElement => {
  const {description, director, starring, rating, scoresCount} = props;

  return (
    <>
      <FilmRating {...{rating, scoresCount}} />

      <div className="movie-card__text">
        {description}

        <p className="movie-card__director">
          <strong>Director: {director}</strong>
        </p>

        <p className="movie-card__starring">
          <strong>Starring: {starring.join(`, `)}</strong>
        </p>
      </div>
    </>
  );
};

export default FilmOverview;
