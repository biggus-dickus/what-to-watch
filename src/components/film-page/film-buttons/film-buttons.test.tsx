import * as React from 'react';
import {StaticRouter as Router} from 'react-router';
import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {FilmButtons} from './film-buttons';

configure({adapter: new Adapter()});


const props = {
  filmId: 1,
  isAdded: false,
  onWatchListToggle: jest.fn(),
  onPlayerLaunch: jest.fn()
};

describe(`FilmButtons test suite`, () => {
  it(`<FilmButtons /> should render correctly`, () => {
    expect(renderer.create(<Router><FilmButtons {...props} /></Router>).toJSON()).toMatchSnapshot();
  });

  it(`"My list" button should display a special icon and text when the currently rendered film IS NOT in user's favourites`, () => {
    const wrapper = shallow(<FilmButtons {...props} />);

    expect(wrapper.find(`[data-test="at-is-not-added"]`)).toHaveLength(1);
    expect(wrapper.find(`[data-test="at-my-list-btn"]`).text()).toEqual(`My list`);
  });

  it(`"My list" button should display a special icon and text when the currently rendered film IS in user's favourites`, () => {
    const newProps = {...props, isAdded: true};
    const wrapper = shallow(<FilmButtons {...newProps} />);

    expect(wrapper.find(`[data-test="at-is-added"]`)).toHaveLength(1);
    expect(wrapper.find(`[data-test="at-my-list-btn"]`).text()).toEqual(`In my list`);
  });
});
