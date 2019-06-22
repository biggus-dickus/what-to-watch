import * as React from 'react';
import {StaticRouter as Router} from 'react-router';

import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {mockFilms} from '../../mocks/films';
import {mockLocation} from '../../mocks/user';
import {NAV_DETAILS_ID} from '../../config/config';

import {getFilmById, getMoreLikeThis} from './helpers';
import {FilmPage} from './film-page';

configure({adapter: new Adapter()});


const props = {
  availableMovies: mockFilms,
  computedMatch: {params: {id: 2}},
  location: {...mockLocation, pathname: `/film/2`},
  loadReviews: jest.fn()
};

const film = getFilmById(mockFilms, props.computedMatch.params.id);
const similarFilms = getMoreLikeThis(mockFilms, film.genre, film.id);


describe(`FilmPage test suite`, () => {
  it(`<FilmPage /> should render correctly`, () => {
    const tree = renderer.create(<Router><FilmPage {...props} /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render a 404 page if the passed id is not within the range of available film IDs`, () => {
    const newProps = {...props, computedMatch: {params: {id: 666}}};

    const wrapper = shallow(<FilmPage {...newProps} />);
    expect(wrapper.find(`NoMatch`)).toHaveLength(1);
  });

  it(`should render "More like this" (films of the same genre) correctly`, () => {
    const wrapper = shallow(<FilmPage {...props} />);
    const filmsList = wrapper.find(`FilmsList`);

    expect(filmsList.prop(`films`)).toHaveLength(similarFilms.length);
  });

  it(`should NOT contain the currently displayed film in the list of similar films`, () => {
    const res = similarFilms.find((it) => it.id === film.id);
    expect(res).toBeUndefined();
  });

  it(`should NOT render "More like this" section if there are no more films of selected genre`, () => {
    const newProps = {
      ...props,
      computedMatch: {params: {id: 1}},
      location: {...props.location, pathname: `/film/1`}
    };

    const wrapper = shallow(<FilmPage {...newProps} />);
    const filmsList = wrapper.find(`FilmsList`);

    expect(filmsList).toHaveLength(0);
  });

  it(`should NOT render more than 4 films in "More like this section"`, () => {
    const newProps = {
      ...props,
      computedMatch: {params: {id: 3}}, // Drama
      location: {...props.location, pathname: `/film/3`}
    };

    const wrapper = shallow(<FilmPage {...newProps} />);
    const filmsList = wrapper.find(`FilmsList`);

    expect(filmsList.props()[`films`].length).toBeLessThanOrEqual(4);
  });

  it(`should render tab content according to the currently selected tab`, () => {
    const newProps = {
      ...props,
      location: {...props.location, hash: `#${NAV_DETAILS_ID}`}
    };

    const wrapper = shallow(<FilmPage {...newProps} />);
    expect(wrapper.find(`FilmDetails`)).toHaveLength(1);
  });

  it(`should render the first tab ("Overview") when the present location hash is not among the range of acceptable values`, () => {
    const wrapper = shallow(<FilmPage {...props} />);
    expect(wrapper.find(`FilmOverview`)).toHaveLength(1);
  });

  it(`should render the first tab ("Overview") when there's no location hash in address bar`, () => {
    const newProps = {
      ...props,
      location: {...props.location, hash: ``}
    };

    const wrapper = shallow(<FilmPage {...newProps} />);
    expect(wrapper.find(`FilmOverview`)).toHaveLength(1);
  });
});
