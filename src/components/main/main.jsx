import React from 'react';
import PropTypes from 'prop-types';

import FilmsList from '../films-list/films-list';

import avatar from '../../../public/img/avatar.jpg';
import grandBudapest from '../../../public/img/the-grand-budapest-hotel-poster.jpg';
import grandBudapestBg from '../../../public/img/bg-the-grand-budapest-hotel.jpg';


const main = ({films, genres}) => (
  <>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={grandBudapestBg} alt="The Grand Budapest Hotel" width="1300" height="552" />
      </div>

      <h1 className="visually-hidden">What to Watch</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src={avatar} alt="User avatar" width="63" height="63"/>
          </div>
        </div>
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={grandBudapest} alt="The Grand Budapest Hotel poster" width="218" height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">Drama</span>
              <span className="movie-card__year">2014</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="img/sprite/sprite.svg#play-s" />
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="img/sprite/sprite.svg#add" />
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <ul className="catalog__genres-list">
          <li className="catalog__genres-item catalog__genres-item--active">
            <a href="#" className="catalog__genres-link">All genres</a>
          </li>
          {genres.map((genre) => (
            <li key={genre} className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">{genre}</a>
            </li>
          ))}
        </ul>

        <FilmsList {...{films}} />

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© {new Date().getFullYear()} What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </>
);

export default main;

main.propTypes = {
  films: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired
};
