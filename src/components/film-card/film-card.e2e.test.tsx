import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {mockFilms} from '../../mocks/films';

import FilmCard from './film-card';
import Video from '../video-player/video-player';

configure({adapter: new Adapter()});


const movieCard = shallow(<FilmCard {...mockFilms[0]} />);

describe(`FilmCard test suite.`, () => {
  it(`Hovering over FilmCard changes 'isHovered' status to true`, () => {
    movieCard.simulate(`mouseenter`);

    const video = movieCard.find(Video);
    expect(video.props().isHovered).toBe(true);
  });

  it(`Moving the mouse away from FilmCard changes 'isHovered' status to false`, () => {
    movieCard.simulate(`mouseleave`);

    const video = movieCard.find(Video);
    expect(video.props().isHovered).toBe(false);
  });
});
