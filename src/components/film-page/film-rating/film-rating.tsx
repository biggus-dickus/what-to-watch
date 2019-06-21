import * as React from 'react';

interface Props {
  rating: number,
  scoresCount: number
}

const RatingToVerdict = new Map([
  [0, `Bad`],
  [1, `Bad`],
  [2, `Normal`],
  [3, `Good`],
  [4, `Very good`],
  [5, `Awesome`]
]);


const FilmRating = ({rating, scoresCount}: Props): React.ReactElement => {
  return (
    <div className="movie-rating">
      <div className="movie-rating__score" data-test="at-film-rating">
        {rating.toFixed(1)}
      </div>

      <p className="movie-rating__meta">
        <span className="movie-rating__level" data-test="at-film-rating-word">
          {RatingToVerdict.get(Math.floor(rating))}
        </span>

        <span className="movie-rating__count">
          {scoresCount} ratings
        </span>
      </p>
    </div>
  );
};

export default FilmRating;
