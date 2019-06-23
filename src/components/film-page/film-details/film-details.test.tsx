import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {mockFilms} from '../../../mocks/films';
import FilmDetails from './film-details';

configure({adapter: new Adapter()});


const props = {
  director: mockFilms[0].director,
  genre: mockFilms[0].genre,
  released: mockFilms[0].released,
  runTime: mockFilms[0].runTime,
  starring: mockFilms[0].starring
};

describe(`FilmDetails test suite`, () => {
  it(`<FilmDetails /> should render correctly`, () => {
    expect(renderer.create(<FilmDetails {...props} />).toJSON()).toMatchSnapshot();
  });

  it(`should correctly transform runTime in minutes into a hh:mm format`, () => {
    const wrapper = shallow(<FilmDetails {...props} />);
    const node = wrapper.find(`[data-test="at-film-duration"]`);

    expect(node.text()).toEqual(`1h 40m`);
  });
});
