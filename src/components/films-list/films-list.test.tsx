import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {StaticRouter as Router} from 'react-router-dom';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {mockFilms} from '../../mocks/films';

import FilmsList from './films-list';

configure({adapter: new Adapter()});


describe(`FilmsList test suite`, () => {
  it(`<FilmsList /> should render correctly`, () => {
    const tree = renderer.create(<Router><FilmsList films={mockFilms} /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should slice received films on mount according to the limit set in config or props and display the "Show more" button`, () => {
    const wrapper = shallow(<FilmsList films={mockFilms} limitTo={4} />);

    expect(wrapper.find(`[data-test="at-films-list"]`).children()).toHaveLength(4);
    expect(wrapper.find(`[data-test="at-films-show-more"]`)).toHaveLength(1);
  });

  it(`should NOT display the "Show more" button if the length of supplied films is less than the slice limit`, () => {
    const wrapper = shallow(<FilmsList films={mockFilms} />);
    expect(wrapper.find(`[data-test="at-films-show-more"]`)).toHaveLength(0);
  });
});
