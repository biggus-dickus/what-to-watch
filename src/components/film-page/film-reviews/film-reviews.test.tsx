import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {ActionType} from '../../../store/action-types';
import {mockReviews} from '../../../mocks/reviews';

import FilmReviews from './film-reviews';

configure({adapter: new Adapter()});


const props = {
  error: null,
  filmId: 1,
  reviews: mockReviews
};

describe(`FilmReviews test suite`, () => {
  it(`<FilmReviews /> should render correctly`, () => {
    expect(renderer.create(<FilmReviews {...props} />).toJSON()).toMatchSnapshot();
  });

  it(`should sort obtained reviews by date (new ones first)`, () => {
    const wrapper = shallow(<FilmReviews {...props} />);

    const firstReview = wrapper.find(`[data-test="at-review-item"]`).at(0);
    expect(firstReview.find(`FilmReview`).at(0).props().id).toEqual(mockReviews[1].id);
  });

  it(`should render an error, and not reviews, if there is one in props`, () => {
    const newProps = {
      ...props,
      error: {type: ActionType.GET_REVIEWS, message: `Nothing found`}
    };

    const wrapper = shallow(<FilmReviews {...newProps} />);

    expect(wrapper.find(`[data-test="at-reviews-error"]`)).toHaveLength(1);
    expect(wrapper.find(`[data-test="at-reviews"]`)).toHaveLength(0);
  });

  it(`should render an info message, and not reviews, if there are no reviews for some film`, () => {
    const newProps = {
      ...props,
      reviews: []
    };

    const wrapper = shallow(<FilmReviews {...newProps} />);

    expect(wrapper.find(`[data-test="at-no-reviews"]`)).toHaveLength(1);
    expect(wrapper.find(`[data-test="at-reviews"]`)).toHaveLength(0);
  });
});
