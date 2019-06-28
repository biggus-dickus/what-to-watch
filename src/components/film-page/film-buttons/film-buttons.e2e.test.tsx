import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {FilmButtons} from './film-buttons';

configure({adapter: new Adapter()});


const props = {
  filmId: 1,
  isAdded: false,
  onWatchListToggle: jest.fn()
};

it(`"My list" button should call onWatchListToggle callback`, () => {
  const wrapper = shallow(<FilmButtons {...props} />);
  const btn = wrapper.find(`[data-test="at-my-list-btn"]`);

  btn.simulate(`click`);
  expect(props.onWatchListToggle).toHaveBeenCalled();
});
