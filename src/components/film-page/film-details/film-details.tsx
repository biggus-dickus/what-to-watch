import * as React from 'react';

interface Props {
  director: string,
  genre: string,
  released: number,
  runTime: number,
  starring: string[]
}

const minToHm = (duration: number): number[] => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return [hours, minutes];
};


const FilmDetails = (props: Props): React.ReactElement => {
  const [h, m] = minToHm(props.runTime);

  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{props.director}</span>
        </p>

        <div className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <ul className="movie-card__details-value">
            {props.starring.map((star, i) => {
              const comma = (i === props.starring.length - 1) ? null : `,`;
              return <li key={star}>{star}{comma}</li>;
            })}
          </ul>
        </div>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{h}h {m}m</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{props.genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{props.released}</span>
        </p>
      </div>
    </div>
  );
};

export default FilmDetails;
