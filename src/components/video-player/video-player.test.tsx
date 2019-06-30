import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {mockFilms} from '../../mocks/films';
import {PlayState} from './video-player'; // eslint-disable-line

import VideoPlayer from './video-player';

configure({adapter: new Adapter()});


const props = {
  show: true,
  duration: mockFilms[1].runTime,
  filmName: mockFilms[1].name,
  onClose: jest.fn(),
  poster: mockFilms[1].posterImage,
  src: mockFilms[1].video
};


describe(`VideoPlayer test suite`, () => {
  it(`<VideoPlayer /> renders correctly`, () => {
    const tree = renderer.create(<VideoPlayer {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should not render anything when the "show" prop is false`, () => {
    const newProps = {...props, show: false};
    const wrapper = shallow(<VideoPlayer {...newProps} />);

    expect(wrapper.find(`video`)).toHaveLength(0);
  });

  it(`should correctly toggle the "Play" button when paused`, () => {
    const wrapper = shallow(<VideoPlayer {...props} />);

    expect(wrapper.find(`[data-test="at-play-btn"]`).text()).toEqual(`Play`);
    expect(wrapper.find(`[data-test="at-play-btn-icon"]`)).toHaveLength(1);
    expect(wrapper.find(`[data-test="at-pause-btn-icon"]`)).toHaveLength(0);

    wrapper.setState({play: PlayState.PLAY});

    expect(wrapper.find(`[data-test="at-play-btn"]`).text()).toEqual(`Pause`);
    expect(wrapper.find(`[data-test="at-pause-btn-icon"]`)).toHaveLength(1);
    expect(wrapper.find(`[data-test="at-play-btn-icon"]`)).toHaveLength(0);
  });
});
