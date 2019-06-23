import * as React from 'react';
import {Link} from 'react-router-dom';

import {Film, Location, User} from '../../types'; // eslint-disable-line

import {getFilmById} from '../film-page/helpers';
import {isLength} from '../../utilities/validators';
import {REVIEW_CHARS_MIN, REVIEW_CHARS_MAX} from '../../config/config';
import RouteConfig from '../../config/routes';

import Logo from '../partials/logo/logo';
import NoMatch from '../no-match/no-match';
import UserBlock from '../partials/user-block/user-block';

interface Props {
  availableFilms: Film[],
  computedMatch: any,
  location: Location,
  userData: User
}

interface State {
  comment: string,
  rating: number
}

const COMMENT_NAME = `comment`;
const RATING_NAME = `rating`;


class AddReview extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      [COMMENT_NAME]: ``,
      [RATING_NAME]: 3,
    };
  }

  get isFormValid() {
    return isLength(this.state[COMMENT_NAME], {
      min: REVIEW_CHARS_MIN,
      max: REVIEW_CHARS_MAX
    });
  }

  _handleInput = (e): void => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  render():React.ReactElement {
    const {availableFilms, computedMatch, location, userData} = this.props;

    const film = getFilmById(availableFilms, +computedMatch.params.id);

    if (film) {
      return (
        <section className="movie-card movie-card--full">
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={film.bgImage} alt={film.name} />
            </div>

            <h1 className="visually-hidden">Add review</h1>

            <header className="page-header">
              <Logo pathname={location.pathname} />

              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link
                      to={RouteConfig.FILM.replace(`:id`, `${film.id}`)}
                      className="breadcrumbs__link">
                      {film.name}
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link">Add review</a>
                  </li>
                </ul>
              </nav>

              <UserBlock location={location} user={userData} />
            </header>

            <div className="movie-card__poster movie-card__poster--small">
              <img src={film.posterImage} alt={`${film.name} poster`} />
            </div>
          </div>

          <div className="add-review">
            <form action="#" className="add-review__form">
              <div className="rating">
                <div className="rating__stars">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <React.Fragment key={val}>
                      <input
                        className="rating__input"
                        id={`star-${val}`}
                        type="radio"
                        name={RATING_NAME}
                        value={val}
                        onChange={this._handleInput}
                        defaultChecked={val === this.state[RATING_NAME]} />
                      <label className="rating__label" htmlFor={`star-${val}`}>
                        Rating {val}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="add-review__text">
                <textarea
                  className="add-review__textarea"
                  name={RATING_NAME}
                  id="review-text"
                  onChange={this._handleInput}
                  placeholder={`Your review ( ${REVIEW_CHARS_MIN}–${REVIEW_CHARS_MAX} characters)`} />

                <div className="add-review__submit">
                  <button
                    className="add-review__btn"
                    type="submit"
                    disabled={!this.isFormValid}>
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      );
    }

    return <NoMatch />;
  }
}

export default AddReview;
