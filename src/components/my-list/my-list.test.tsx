import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {StaticRouter as Router} from 'react-router-dom';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {mockFilms} from '../../mocks/films';
import {mockLocation} from '../../mocks/user';
import mockUser from '../../mocks/user';

import {MyList} from './my-list';

configure({adapter: new Adapter()});

const props = {
  location: mockLocation,
  onGetWatchList: jest.fn(),
  userData: mockUser,
  watchList: mockFilms.filter((film) => film.isFavourite)
};

describe(`MyList test suite`, () => {
  it(`<MyList /> should render correctly`, () => {
    const tree = renderer.create(
        <Router>
          <MyList {...props} />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should display a notification if there is nothing in the watch list`, () => {
    const newProps = {...props, watchList: []};

    const wrapper = shallow(<MyList {...newProps} />);
    expect(wrapper.find(`[data-test="at-no-films-notification"]`)).toHaveLength(1);
  });
});
