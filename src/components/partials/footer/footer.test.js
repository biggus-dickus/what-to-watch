import * as React from 'react';
import renderer from 'react-test-renderer';

import Footer from './footer';

const tree = renderer.create(<Footer pathname="/" />).toJSON();

it(`<Footer /> should render correctly`, () => expect(tree).toMatchSnapshot());
