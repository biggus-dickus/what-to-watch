import * as React from 'react';

import {Film, Location, User} from '../../types'; // eslint-disable-line
import {NAV_OVERVIEW_ID, NAV_DETAILS_ID, NAV_REVIEWS_ID, filmTabs} from '../../config/config';

import {getFilmById, getMoreLikeThis} from './helpers';

import FilmButtons from './film-buttons/film-buttons';
import FilmDetails from './film-details/film-details';
import FilmsList from '../films-list/films-list';
import FilmNav from './film-nav/film-nav';
import FilmOverview from './film-overview/film-overview';
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


const FilmPage = (props: Props): React.ReactElement => {
  const {availableMovies, computedMatch, location, userData} = props;
  const {hash, key} = location;

  const [activeTabId, setActiveTabId] = React.useState(hash.split(`#`)[1] || NAV_OVERVIEW_ID);

  // React.useEffect(() => {
  //   setActiveTabId(NAV_OVERVIEW_ID);
  // }, [key]);

  const handleTabChange = (newTabId: string): void => {
    if (activeTabId !== newTabId) {
      setActiveTabId(newTabId);
    }
  };

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
                  activeTabId={activeTabId}
                  onTabClick={handleTabChange} />

                {activeTabId === NAV_OVERVIEW_ID && (
                  <FilmOverview
                    description={film.description}
                    director={film.director}
                    rating={film.rating}
                    scoresCount={film.scoresCount}
                    starring={film.starring} />
                )}

                {activeTabId === NAV_DETAILS_ID && (
                  <FilmDetails
                    director={film.director}
                    genre={film.genre}
                    released={film.released}
                    runTime={film.runTime}
                    starring={film.starring} />
                )}
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

export default FilmPage;
