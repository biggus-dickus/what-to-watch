import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmCard from './film-card';
import {mockFilms} from '../../mocks/mock-schmock';


configure({adapter: new Adapter()});

it(`Hovering on film preview returns an object with film info`, () => {
  const mockHandler = jest.fn(() => mockFilms[0]);
  const movieCard = shallow(<FilmCard {...mockFilms[0]} onActive={mockHandler} />);

  const button = movieCard.find(`button`);
  button.simulate(`click`, mockHandler);

  expect(mockHandler).toHaveReturnedWith(mockFilms[0]);
});
