import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FilmCard from './film-card';
import {films} from '../../mock/films';


configure({adapter: new Adapter()});

it(`Clicking on movie card title link works`, () => {
  const mockHandler = jest.fn(() => 42);
  const movieCard = shallow(<FilmCard {...films[0]} clickHandler={mockHandler} />);

  const link = movieCard.find(`a`);
  link.simulate(`click`, mockHandler);

  expect(mockHandler).toHaveBeenCalled();
  expect(mockHandler).toHaveReturnedWith(42);
});
