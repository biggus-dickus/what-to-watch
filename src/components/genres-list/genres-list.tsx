import * as React from 'react';

import {Genre} from '../../types'; // eslint-disable-line
import {GENRES_LIMIT} from '../../config/config';


const GenresList = ({genres, currentGenre, onGenreChange}: Genre): React.ReactElement => {
  return (
    <ul className="catalog__genres-list" data-test="at-genres-list">
      {genres.slice(0, GENRES_LIMIT).map((genre) => {
        const classList = [`catalog__genres-item`];
        const isActive = genre === currentGenre;

        if (isActive) {
          classList.push(`catalog__genres-item--active`);
        }

        return (
          <li key={genre} className={classList.join(` `)}>
            <a href={(isActive) ? null : `#${genre.replace(/ /g, `-`)}`}
              className="catalog__genres-link"
              onClick={onGenreChange.bind(null, genre)}>
              {genre}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default GenresList;
