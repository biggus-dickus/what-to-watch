import * as React from 'react';
import {StaticRouter as Router} from 'react-router';

import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow, mount} from 'enzyme';

import {mockFilms} from '../../mocks/films';
import {mockLocation} from '../../mocks/user';
import {MORE_LIKE_THIS_LIMIT} from '../../config/config';

import {getFilmById, getMoreLikeThis} from './helpers';
import FilmDetails from './film-details';

configure({adapter: new Adapter()});


const props = {
  availableMovies: mockFilms,
  computedMatch: {params: {id: 2}},
  location: {...mockLocation, pathname: `/film/2`}
};

const film = getFilmById(mockFilms, props.computedMatch.params.id);
const similarFilms = getMoreLikeThis(mockFilms, film.genre, film.id);


describe(`FilmDetails test suite`, () => {
  it(`<FilmDetails /> should render correctly`, () => {
    const tree = renderer.create(<Router><FilmDetails {...props} /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render a 404 page if the passed id is not within the range of available film IDs`, () => {
    const newProps = {...props, computedMatch: {params: {id: 666}}};

    const wrapper = shallow(<FilmDetails {...newProps} />);
    expect(wrapper.find(`NoMatch`)).toHaveLength(1);
  });

  it(`should render "More like this" (films of the same genre) correctly`, () => {
    const wrapper = mount(<Router><FilmDetails {...props} /></Router>);
    expect(wrapper.find(`[data-test="at-catalog-list"]`).children()).toHaveLength(similarFilms.length);

    wrapper.unmount();
  });

  it(`should NOT contain the currently displayed film in the list of similar films`, () => {
    const res = similarFilms.find((it) => it.id === film.id);
    expect(res).toBeUndefined();
  });

  it(`should NOT render "More like this" section if there are no films of selected genre`, () => {
    const newProps = {
      ...props,
      computedMatch: {params: {id: 1}},
      location: {...props.location, pathname: `/film/1`}
    };

    const wrapper = mount(<Router><FilmDetails {...newProps} /></Router>);
    expect(wrapper.find(`[data-test="at-catalog-list"]`).children()).toHaveLength(0);

    wrapper.unmount();
  });

  it(`should NOT render more than ${MORE_LIKE_THIS_LIMIT} films in "More like this section"`, () => {
    const newProps = {
      ...props,
      computedMatch: {params: {id: 3}}, // Drama
      location: {...props.location, pathname: `/film/3`}
    };

    const wrapper = mount(<Router><FilmDetails {...newProps} /></Router>);
    expect(wrapper.find(`[data-test="at-catalog-list"]`).children().toBeLessThanOrEqual(MORE_LIKE_THIS_LIMIT));

    wrapper.unmount();
  });
});
