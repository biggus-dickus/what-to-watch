import * as React from 'react';
import {StaticRouter as Router} from 'react-router';

import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {mockFilms} from '../../mocks/films';
import {mockLocation} from '../../mocks/user';
import mockUser from '../../mocks/user';

import AddReview from './add-review';

configure({adapter: new Adapter()});


const props = {
  availableFilms: mockFilms,
  computedMatch: {params: {id: 3}},
  location: {...mockLocation, pathname: `/film/3/review`},
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
});
