import * as React from 'react';
import {connect} from 'react-redux';

import {Film, Location, User} from '../../types'; // eslint-disable-line
import {NAV_OVERVIEW_ID, NAV_DETAILS_ID, NAV_REVIEWS_ID, filmTabs} from '../../config/config';

import {getError, getReviews} from '../../store/reducers/data/selectors';
import {getFilmById, getMoreLikeThis} from './helpers';
import {Operation} from '../../store/operations';

import FilmButtons from './film-buttons/film-buttons';
import FilmDetails from './film-details/film-details';
import FilmsList from '../films-list/films-list';
import FilmNav from './film-nav/film-nav';
import FilmOverview from './film-overview/film-overview';
import FilmReviews from './film-reviews/film-reviews';
import FilmTitle from './film-title/film-title';
import Footer from '../partials/footer/footer';
import Logo from '../partials/logo/logo';
import NoMatch from '../no-match/no-match';
import UserBlock from '../partials/user-block/user-block';

interface Props {
  availableMovies: Film[],
  computedMatch: any,
  error?: string,
  location: Location,
  onAddToWatchList: (id: number) => Promise<any>,
  onRemoveFromWatchList: (id: number) => Promise<any>,
  reviews?: any[],
  userData?: User,
  loadReviews: (filmId: number) => void
}

const getValidTabId = (hashVal:string):string => {
  if (hashVal && [NAV_OVERVIEW_ID, NAV_DETAILS_ID, NAV_REVIEWS_ID].includes(hashVal)) {
    return hashVal;
  }

  return NAV_OVERVIEW_ID;
};


export const FilmPage = (props: Props): React.ReactElement => {
  const {
    availableMovies,
    computedMatch,
    location,
    onAddToWatchList,
    onRemoveFromWatchList,
    userData,
    loadReviews
  } = props;

  const {hash, pathname} = location;

  const [activeTabId, setActiveTabId] = React.useState(getValidTabId(hash.split(`#`)[1]));

  const [didMount, setDidMount] = React.useState(false);
  React.useEffect(() => setDidMount(true), []);

  // Fetch reviews on load and subsequent location changes
  React.useEffect(() => {
    (async function () {
      await loadReviews(+computedMatch.params.id);
    })();
  }, [pathname]);

  // Revert active tab to default one, but only on subsequent changes to location
  React.useEffect(() => {
    if (didMount) {
      setActiveTabId(NAV_OVERVIEW_ID);
    }
  }, [pathname]);

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
        <section
          className="movie-card movie-card--full"
          style={{background: film.bgColor}}>
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
                <FilmTitle
                  name={film.name}
                  genre={film.genre}
                  released={film.released}
                  ish1 />

                <FilmButtons
                  filmId={film.id}
                  isAdded={film.isFavourite}
                  {...{onAddToWatchList, onRemoveFromWatchList, location}}
                />
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

                {activeTabId === NAV_REVIEWS_ID && (
                  <FilmReviews
                    error={props.error}
                    filmId={film.id}
                    reviews={props.reviews} />
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

const mapStateToProps = (state) => ({
  error: getError(state),
  reviews: getReviews(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadReviews: (id) => dispatch(Operation.fetchReviews(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);
