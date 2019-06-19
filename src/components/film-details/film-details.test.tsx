import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {mockFilms} from '../../mocks/films';

import FilmDetails from './film-details';


configure({adapter: new Adapter()});

const props = {
  availableMovies: mockFilms,
  computedMatch: {params: {id: 1}}
};

describe(`FilmDetails test suite`, () => {
  it(`<FilmDetails /> should render correctly`, () => {
    const tree = renderer.create(<FilmDetails {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`<FilmDetails /> should render a 404 page if the passed id is not within the range of available film IDs`, () => {
    const newProps = {...props, computedMatch: {params: {id: 666}}};

    const wrapper = shallow(<FilmDetails {...newProps} />);
    expect(wrapper.find(`NoMatch`)).toHaveLength(1);
  });
});
