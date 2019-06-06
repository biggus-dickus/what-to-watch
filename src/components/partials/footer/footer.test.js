import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './footer';

const tree = renderer.create(<Footer isHomePage={true} />).toJSON();

it(`<Footer /> should render correctly`, () => expect(tree).toMatchSnapshot());