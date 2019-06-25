import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {FilmButtons} from './film-buttons';

configure({adapter: new Adapter()});


const props = {
  filmId: 1,
  isAdded: false,
  onReviewAdd: jest.fn(() => Promise.resolve()),
  onReviewRemove: jest.fn(() => Promise.resolve())
};

describe(`FilmButtons e2e test suite`, () => {
  it(`"My list" button should call onReviewAdd callback when the film IS NOT in user's favourites`, () => {
    const wrapper = shallow(<FilmButtons {...props} />);
    const btn = wrapper.find(`[data-test="at-my-list-btn"]`);

    btn.simulate(`click`);
    expect(props.onReviewAdd).toHaveBeenCalled();
  });

  it(`"My list" button should call onReviewRemove callback when the film IS in user's favourites`, () => {
    const newProps = {...props, isAdded: true};
    const wrapper = shallow(<FilmButtons {...newProps} />);
    const btn = wrapper.find(`[data-test="at-my-list-btn"]`);

    btn.simulate(`click`);
    expect(props.onReviewRemove).toHaveBeenCalled();
  });
});
