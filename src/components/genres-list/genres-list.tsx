import * as React from 'react';

import {Genre} from '../../types/types'; // eslint-disable-line

import GenresListItem from './list-item/genres-list-item';


const GenresList = ({genres, currentGenre, onGenreChange}: Genre) => {
  return (
    <ul className="catalog__genres-list">
      <GenresListItem
        items={genres}
        activeItemName={currentGenre}
        {...{onGenreChange}} />
    </ul>
  );
};

export default GenresList;
