import React from 'react';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BASE_HOST} from '../../../config/api-endpoints';
import UserBlock from './user-block';

configure({adapter: new Adapter()});

const mockUser = {
  avatar_url: '/wtw/static/avatar/10.jpg', // eslint-disable-line
  id: 777,
  email: `test@test.com`,
  name: `Poehavshiy`,
};


describe(`UserBlock test suite.`, () => {
  it(`<UserBlock /> should render correctly`, () => {
    const tree = renderer.create(<UserBlock user={mockUser} onLinkClick={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should contain a link to sign-in page if a user is not logged in`, () => {
    const wrapper = shallow(<UserBlock user={null} onLinkClick={jest.fn()} />);

    expect(wrapper.find(`a`)).toHaveLength(1);
  });

  it(`should show the user's avatar if they are logged in`, () => {
    const wrapper = shallow(<UserBlock user={mockUser} onLinkClick={jest.fn()} />);

    expect(wrapper.find(`img`).prop(`src`)).toEqual(`${BASE_HOST}${mockUser.avatar_url}`);
  });
});
