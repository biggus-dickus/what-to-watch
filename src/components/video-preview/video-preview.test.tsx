import * as React from 'react';
import * as renderer from 'react-test-renderer';

import VideoPreview from './video-preview';


const props = {
  poster: `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e4/e4224a21287a6983fa0cc3ffcb310230c22e1538_full.jpg`,
  src: `/etc/na-zdorovnya.mp4`,
  isHovered: false,
  muted: true,
  width: 640,
  height: 480
};

const tree = renderer.create(<VideoPreview {...props} />).toJSON();

it(`<VideoPlayer /> should render correctly`, () => expect(tree).toMatchSnapshot());
