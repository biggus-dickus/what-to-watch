import * as React from 'react';

import {Film} from '../../types'; // eslint-disable-line
import {FILMS_LIMIT} from '../../config/config';

import FilmCard from '../film-card/film-card';


interface Props {
  films: Film[],
  limitTo?: number
}

const FilmsList = ({films, limitTo = FILMS_LIMIT}: Props): React.ReactElement => {
  const [filmsToRender, setFilmsToRender] = React.useState(films.slice(0, limitTo));

  React.useEffect(() => setFilmsToRender(films.slice(0, limitTo)), [films]);

  const onBtnClick = () => {
    if (filmsToRender.length < films.length) {
      setFilmsToRender(films.slice(0, filmsToRender.length + limitTo));
    }
  };

  if (films.length) {
    return (
      <>
        <div className="catalog__movies-list" data-test="at-films-list">
          {filmsToRender.map((film) => <FilmCard key={film.id} {...film} />)}
        </div>

        {filmsToRender.length < films.length && (
          <div className="catalog__more">
            <button
              data-test="at-films-show-more"
              className="catalog__button"
              type="button"
              onClick={onBtnClick}>
              Show more
            </button>
          </div>
        )}
      </>
    );
  }

  return null;
};

export default FilmsList;
