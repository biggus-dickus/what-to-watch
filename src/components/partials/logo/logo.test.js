import React from 'react';
import {StaticRouter as Router} from 'react-router-dom';

import {configure, mount} from 'enzyme';
import renderer from 'react-test-renderer';

import RouteConfig from '../../../config/routes';
import Logo from './logo';
import Adapter from "enzyme-adapter-react-16/build";


configure({adapter: new Adapter()});

describe(`Logo test suite`, () => {
  it(`<Logo /> should render correctly`, () => {
    const tree = renderer.create(
        <Router><Logo pathname={RouteConfig.SIGN_IN} /></Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should contain a link to the home page if it's rendered by any route except home`, () => {
    const wrapper = mount(<Router><Logo pathname={RouteConfig.SIGN_IN} /></Router>);
    const link = wrapper.find(`Link`);

    expect(link).toHaveLength(1);
    expect(link.prop(`to`)).toEqual(RouteConfig.INDEX);

    wrapper.unmount();
  });

  it(`should NOT contain a link if it's rendered on home page per se`, () => {
    const wrapper = mount(<Router><Logo pathname={RouteConfig.INDEX} /></Router>);
    const link = wrapper.find(`Link`);

    expect(link).toHaveLength(0);

    wrapper.unmount();
  });
});

