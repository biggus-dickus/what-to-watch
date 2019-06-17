import {Genre as GenreType} from '../types'; // eslint-disable-line

export const Genre = {
  ALL: `All genres`,
  COMEDIES: `Comedies`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMAS: `Dramas`,
  HORROR: `Horror`,
  FAMILY: `Kids & Family`,
  ROMANCE: `Romance`,
  SCI_FI: `Sci-Fi`,
  THRILLERS: `Thrillers`
};

export const mockGenres = Object.values(Genre);

export const mockGenreEntity: GenreType = {
  currentGenre: Genre.CRIME,
  genres: [...mockGenres],
  onGenreChange: jest.fn()
};
