export interface Film {
  bgColor: string,
  bgImage: string,
  description: string,
  director: string,
  genre: string,
  id: number,
  isFavourite: boolean,
  name: string,
  pageUrl: string,
  posterImage: string,
  previewImage: string,
  previewVideo: string,
  rating: number,
  released: number,
  runTime: number,
  scoresCount: number,
  starring: string[],
  video: string
}

export interface Genre {
  currentGenre?: string,
  genres?: Array<string>,
  onGenreChange?: (newGenre: string) => object
}

export interface Location {
  hash: string,
  key: string,
  pathname: string,
  search: string
}

export interface User {
  avatar_url: string, // eslint-disable-line
  email: string,
  id: number,
  name: string
}
