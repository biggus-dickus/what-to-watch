import * as React from 'react';

import {Film, Location, User} from '../../types'; // eslint-disable-line

import {getFilmById, getMoreLikeThis} from './helpers';

import FilmButtons from './film-buttons/film-buttons';
import FilmsList from '../films-list/films-list';
import FilmRating from './film-rating/film-rating';
import FilmNav from './film-nav/film-nav';
import FilmTitle from './film-title/film-title';
import Footer from '../partials/footer/footer';
import NoMatch from '../no-match/no-match';
import Logo from "../partials/logo/logo";
import UserBlock from "../partials/user-block/user-block";

interface Props {
  availableMovies: Film[],
  computedMatch: any,
  location: Location,
  userData?: User
}

const filmTabs = [`Overview`, `Details`, `Reviews`];


const FilmDetails = (props: Props): React.ReactElement => {
  const [activeTab, setActiveTab] = React.useState(filmTabs[0]);
  const handleTabChange = (newTab: string): void => setActiveTab(newTab);

  const {availableMovies, computedMatch, location, userData} = props;

  const film = getFilmById(availableMovies, +computedMatch.params.id);

  if (film) {
    const similarFilms = getMoreLikeThis(availableMovies, film.genre, film.id);

    return (
      <>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={film.bgImage} alt={film.name} />
            </div>

            <header className="page-header movie-card__head">
              <Logo pathname={location.pathname}/>

              <UserBlock location={location} user={userData} />
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <FilmTitle name={film.name} genre={film.genre} released={film.released} ish1 />

                <FilmButtons />
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={film.posterImage} alt={`${film.name} poster`} />
              </div>

              <div className="movie-card__desc">
                <FilmNav
                  tabs={filmTabs}
                  activeTab={activeTab}
                  onTabClick={handleTabChange} />

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

        <div className="page-content">
          {similarFilms.length ? (
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>
              <FilmsList films={similarFilms} />
            </section>
          ) : null}

          <Footer pathname={location.pathname} />
        </div>
      </>
    );
  }

  return <NoMatch />;
};

export default FilmDetails;
