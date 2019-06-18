import * as React from 'react';
import {StaticRouter as Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {BASE_HOST} from '../../../config/api-endpoints';
import Route from '../../../config/routes';

import {mockLocation as location} from '../../../mocks/user';
import mockUser from '../../../mocks/user';

import UserBlock from './user-block';

configure({adapter: new Adapter()});


describe(`UserBlock test suite.`, () => {
  it(`<UserBlock /> should render correctly`, () => {
    const tree = renderer.create(<Router><UserBlock user={mockUser} {...{location}} /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should contain a link to sign-in page if a user is not logged in`, () => {
    const wrapper = shallow(<UserBlock user={null} {...{location}} />);
    const link = wrapper.find(`Link`);

    expect(link).toHaveLength(1);
    expect(link.prop(`to`)).toEqual(Route.SIGN_IN);
  });

  it(`should show the user's avatar if they are logged in`, () => {
    const wrapper = shallow(<UserBlock user={mockUser} {...{location}} />);

    expect(wrapper.find(`img`).prop(`src`)).toEqual(`${BASE_HOST}${mockUser.avatar_url}`);
  });
});
