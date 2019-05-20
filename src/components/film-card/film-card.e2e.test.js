import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmCard from './film-card';
import {mockFilms} from '../../mocks/mock-schmock';

configure({adapter: new Adapter()});


let isHovered = false;
function toggleHovered(state) {
  isHovered = state;
}

const movieCard = shallow(<FilmCard {...mockFilms[0]} />);

it(`Hovering over FilmCard changes 'isHovered' status to true`, () => {
  React.useState = toggleHovered(true);

  movieCard.simulate(`mouseover`);
  expect(isHovered).toBe(true);
});

it(`Moving the mouse away from FilmCard changes 'isHovered' status to false`, () => {
  React.useState = toggleHovered(false);

  movieCard.simulate(`mouseover`);
  expect(isHovered).toBe(false);
});
