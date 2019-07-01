import * as React from 'react';
import {Link} from 'react-router-dom';

import {ActionType} from '../../../store/action-types';
import {Review} from '../../../types'; // eslint-disable-line
import RouteConfig from '../../../config/routes';

import {formatDate} from '../../../utilities/helpers';

interface Props {
  error: {type: string, message: string},
  filmId: number,
  reviews: Review[]
}

const sortByDate = (reviews: Review[]): Review[] => {
  return reviews.slice().sort((a, b) => +new Date(b.date) - +new Date(a.date));
};


const FilmReview = (review) => (
  <div className="review" data-test="at-review-item">
    <blockquote className="review__quote">
      <p className="review__text">{review.comment}</p>

      <footer className="review__details">
        <cite className="review__author" data-test="at-review-author">
          {review.user.name}
        </cite>
        <time className="review__date" dateTime={formatDate(review.date).local}>
          {formatDate(review.date).comprehensible}
        </time>
      </footer>
    </blockquote>

    <div className="review__rating">
      {review.rating.toFixed(1)}
    </div>
  </div>
);


const FilmReviews = ({error, filmId, reviews = []}: Props): React.ReactElement => {
  if (error && error.type === ActionType.GET_REVIEWS) {
    return <p className="review" data-test="at-reviews-error">{error.message}</p>;
  }

  if (!reviews.length) {
    return (
      <p className="review no-reviews" data-test="at-no-reviews">
        There are no reviews for this film yet.
        Be the first to <Link to={RouteConfig.ADD_REVIEW.replace(`:id`, `` + filmId)}>add one</Link>!
      </p>
    );
  }

  const sortedReviews = sortByDate(reviews);
  const even = sortedReviews.filter((it, i) => i % 2 === 0);
  const odd = sortedReviews.filter((it, i) => i % 2 !== 0);

  return (
    <div className="movie-card__reviews movie-card__row" data-test="at-reviews">
      {[even, odd].map((it, i) =>
        it.length ? (
          <div className="movie-card__reviews-col" key={`review-${i}`}>
            {it.map((review) => <FilmReview key={review.id} {...review} />)}
          </div>
        ) : null
      )}
    </div>
  );
};

export default FilmReviews;
