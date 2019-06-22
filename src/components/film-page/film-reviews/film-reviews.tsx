import * as React from 'react';

import {Review} from '../../../types'; // eslint-disable-line

import {formatDate} from '../../../utilities/helpers';

interface Props {
  error: string,
  reviews: Review[]
}

const sortByDate = (reviews: Review[]): Review[] => {
  return reviews.slice().sort((a, b) => +new Date(b.date) - +new Date(a.date));
};


const FilmReviews = ({error, reviews = []}: Props): React.ReactElement => {
  if (error) {
    return <p className="review" data-test="at-reviews-error">{error}</p>;
  }

  if (!reviews.length) {
    return <p className="review" data-test="at-no-reviews">There are no reviews for this film yet.</p>;
  }

  return (
    <div className="movie-card__reviews movie-card__row" data-test="at-reviews">
      <div className="movie-card__reviews-col">
        {sortByDate(reviews).map((review) => (
          <div className="review" key={review.id} data-test="at-review-item">
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
        ))}
      </div>
    </div>
  );
};

export default FilmReviews;
