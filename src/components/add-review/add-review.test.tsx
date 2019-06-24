import * as React from 'react';
import {StaticRouter as Router} from 'react-router';

import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {mockFilms} from '../../mocks/films';
import {mockLocation} from '../../mocks/user';
import mockUser from '../../mocks/user';

import {COMMENT_NAME, RATING_NAME} from './add-review';
import {AddReview} from './add-review';

configure({adapter: new Adapter()});


const props = {
  availableFilms: mockFilms,
  computedMatch: {params: {id: 3}},
  location: {...mockLocation, pathname: `/film/3/review`},
  onReviewPost: jest.fn(),
  userData: mockUser
};


describe(`AddReview test suite`, () => {
  it(`<AddReview /> should render correctly`, () => {
    const tree = renderer.create(<Router><AddReview {...props} /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render a 404 page if the passed id is not within the range of available film IDs`, () => {
    const newProps = {...props, computedMatch: {params: {id: 666}}};

    const wrapper = shallow(<AddReview {...newProps} />);
    expect(wrapper.find(`NoMatch`)).toHaveLength(1);
  });

  it(`the "Submit" button should be disabled until the form is filled and valid`, () => {
    const wrapper = shallow(<AddReview {...props} />);
    expect(wrapper.find(`[data-test="at-review-submit-btn"]`).prop(`disabled`)).toEqual(true);

    wrapper.setState({
      [COMMENT_NAME]: `Wish in one hand, shit in the other. See which one gets filled first`,
      [RATING_NAME]: `3`
    });

    expect(wrapper.find(`[data-test="at-review-submit-btn"]`).prop(`disabled`)).toEqual(false);
  });

  it(`should display the error it got through props`, () => {
    const newProps = {...props, error: `Something went wrong`};
    const wrapper = shallow(<AddReview {...newProps} />);

    expect(wrapper.find(`[data-test="at-add-review-error"]`)).toHaveLength(1);
  });
});
