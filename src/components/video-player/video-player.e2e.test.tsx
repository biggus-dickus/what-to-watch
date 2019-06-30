import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {mockFilms} from '../../mocks/films';
import {PlayState} from './video-player'; // eslint-disable-line

import VideoPlayer from './video-player';

configure({adapter: new Adapter()});


const props = {
  show: true,
  duration: mockFilms[2].runTime,
  filmName: mockFilms[2].name,
  onClose: jest.fn(),
  poster: mockFilms[2].posterImage,
  src: mockFilms[2].video
};


describe(`VideoPlayer e2e test suite`, () => {
  it(`should correctly toggle the Play/Pause state`, () => {
    const wrapper = shallow(<VideoPlayer {...props} />);
    const playBtn = wrapper.find(`[data-test="at-play-btn"]`);

    playBtn.simulate(`click`);
    expect(wrapper.state().play).toEqual(PlayState.PLAY);

    playBtn.simulate(`click`);
    expect(wrapper.state().play).toEqual(PlayState.PAUSE);
  });

  it(`should hide the player on click on "Exit" button`, () => {
    const wrapper = shallow(<VideoPlayer {...props} />);
    const btn = wrapper.find(`[data-test="at-exit-btn"]`);

    btn.simulate(`click`);
    expect(props.onClose).toHaveBeenCalled();
  });
});
