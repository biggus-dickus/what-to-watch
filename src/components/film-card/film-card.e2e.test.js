import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {mockFilms} from '../../mocks/mock-schmock';

import FilmCard from './film-card';
import Video from '../video-player/video-player';

configure({adapter: new Adapter()});


describe(`FilmCard test suite.`, () => {
  const movieCard = shallow(<FilmCard {...mockFilms[0]} />);
  const video = movieCard.find(Video);

  it(`Hovering over FilmCard changes 'isHovered' status to true`, () => {
    movieCard.simulate(`mouseenter`);
    expect(video.props().isHovered).toBe(true);
  });

  it(`Moving the mouse away from FilmCard changes 'isHovered' status to false`, () => {
    movieCard.simulate(`mouseleave`);
    expect(video.props().isHovered).toBe(false);
  });
});
