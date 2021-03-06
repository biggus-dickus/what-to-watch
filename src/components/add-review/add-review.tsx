import * as React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

/* eslint-disable */
import {ActionType} from '../../store/action-types';
import {History} from 'history';
import {Film, Location, User} from '../../types';
/* eslint-enable */

import {getError} from '../../store/reducers/data/selectors';
import {Operation} from '../../store/operations';

import {NAV_REVIEWS_ID} from '../../config/config';
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
  history?: History,
  location: Location,
  userData: User,
  onReviewPost: (data: PostData) => Promise<any>,
  error?: {type: string, message: string}
}

interface State {
  comment: string,
  rating: string
}

interface PostData {
  filmId: number,
  rating: string,
  comment: string
}

export const COMMENT_NAME = `comment`;
export const RATING_NAME = `rating`;


export class AddReview extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      [COMMENT_NAME]: ``,
      [RATING_NAME]: `3`,
    };
  }

  get isFormValid(): boolean {
    return this.state[RATING_NAME] &&
      isLength(this.state[COMMENT_NAME], {
        min: REVIEW_CHARS_MIN,
        max: REVIEW_CHARS_MAX
      });
  }

  _handleInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {name, value} = e.target as HTMLInputElement;
    const newState = {[name]: value} as Pick<State, keyof State>;
    this.setState(newState);
  };

  _handleSubmit = (e: React.FormEvent): any => {
    e.preventDefault();

    const {computedMatch, history, onReviewPost} = this.props;
    const filmId = +computedMatch.params.id;

    if (this.isFormValid) {
      onReviewPost({
        filmId,
        rating: this.state[RATING_NAME],
        comment: this.state[COMMENT_NAME]
      }).then(() => {
        if (!this.props.error || this.props.error.type !== ActionType.POST_REVIEW) {
          history.push(RouteConfig.FILM.replace(`:id`, `${filmId}#${NAV_REVIEWS_ID}`));
        }
      });
    }
  };

  render():React.ReactElement {
    const {availableFilms, computedMatch, location, userData} = this.props;

    const film = getFilmById(availableFilms, +computedMatch.params.id);

    if (film) {
      const reviewError = (this.props.error && this.props.error.type === ActionType.POST_REVIEW) ? this.props.error.message : null;

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
            <form
              action="?"
              method="post"
              className="add-review__form"
              onSubmit={this._handleSubmit}>

              {reviewError && (
                <p className="add-review__error" data-test="at-add-review-error">
                  {reviewError}
                </p>
              )}

              <div className="rating">
                <div className="rating__stars">
                  {[`1`, `2`, `3`, `4`, `5`].map((val) => (
                    <React.Fragment key={val}>
                      <input
                        className="rating__input"
                        id={`star-${val}`}
                        type="radio"
                        name={RATING_NAME}
                        value={val}
                        onChange={this._handleInput}
                        defaultChecked={val === this.state[RATING_NAME]}
                        required />
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
                  name={COMMENT_NAME}
                  id="review-text"
                  minLength={REVIEW_CHARS_MIN}
                  maxLength={REVIEW_CHARS_MAX}
                  onChange={this._handleInput}
                  placeholder={`Your review (${REVIEW_CHARS_MIN}–${REVIEW_CHARS_MAX} characters)`}
                  required />

                <div className="add-review__submit">
                  <button
                    className="add-review__btn"
                    data-test="at-review-submit-btn"
                    type="submit"
                    disabled={!this.isFormValid && !reviewError}>
                    Post
                  </button>
                </div>
              </div>

              <p className="add-review__counter">
                {this.state[COMMENT_NAME].length}/{REVIEW_CHARS_MAX} characters
              </p>
            </form>
          </div>
        </section>
      );
    }

    return <NoMatch />;
  }
}

const mapStateToProps = (state) => ({
  error: getError(state)
});

const mapDispatchToProps = (dispatch) => ({
  onReviewPost: (postData: PostData): Promise<any> => dispatch(Operation.postReview(postData))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddReview));
