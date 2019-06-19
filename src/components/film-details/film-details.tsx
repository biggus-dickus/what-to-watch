import * as React from 'react';

import {Film, Location, User} from '../../types'; // eslint-disable-line

import FilmButtons from './film-buttons/film-buttons';
import FilmRating from './film-rating/film-rating';
import FilmTitle from './film-title/film-title';
import NoMatch from '../no-match/no-match';
import Logo from "../partials/logo/logo";
import UserBlock from "../partials/user-block/user-block";

interface Props {
  availableMovies: Film[],
  computedMatch: any,
  location: Location,
  userData?: User
}

const getFilmById = (films: Film[], id: number): Film | undefined => films.find((film) => film.id === id);


const FilmDetails = (props: Props): React.ReactElement => {
  const {availableMovies, computedMatch, location, userData} = props;

  const film = getFilmById(availableMovies, +computedMatch.params.id);

  return (film) ? (
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={film.bgImage} alt={film.name} />
        </div>

        <header className="page-header movie-card__head">
          <Logo pathname={location.pathname} />

          <UserBlock location={location} user={userData} />
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <FilmTitle name={film.name} genre={film.genre} released={film.released} ish1 />

            <FilmButtons showAddReview={!!userData} />
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={film.posterImage} alt={`${film.name} poster`} />
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className="movie-nav__item movie-nav__item--active">
                  <a href="#" className="movie-nav__link">Overview</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Details</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Reviews</a>
                </li>
              </ul>
            </nav>

            <FilmRating rating={film.rating} scoresCount={film.scoresCount} />

            <div className="movie-card__text">
              {film.description}

              <p className="movie-card__director">
                <strong>Director: {film.director}</strong>
              </p>

              <p className="movie-card__starring">
                <strong>Starring: {film.starring.join(`, `)}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  ) : <NoMatch />;
};

export default FilmDetails;
