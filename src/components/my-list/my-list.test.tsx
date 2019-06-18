import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {StaticRouter as Router} from 'react-router-dom';

import {mockFilms} from '../../mocks/films';
import {mockLocation} from '../../mocks/user';
import mockUser from '../../mocks/user';

import MyList from './my-list';

const tree = renderer.create(
    <Router>
      <MyList
        location={mockLocation}
        userData={mockUser}
        selectedMovies={mockFilms.filter((film) => film.isFavourite)} />
    </Router>
).toJSON();

it(`<MyList /> should render correctly`, () => expect(tree).toMatchSnapshot());
