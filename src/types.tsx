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

export interface FormField {
  htmlFormTag: string,
  label?: string,
  type?: string,
  placeholder?: string,
  name: string,
  value?: string,
  id: string,
  required?: boolean
}

export interface FormFieldWithValidation extends FormField {
  validate(val: any): boolean,
  validWhen: boolean
}

export interface GenericFormProps {
  formFields: FormField[],
  isFormValid: boolean,
  isSubmitted: boolean,
  onInputChange(): void,
  onStateReset(): void,
  onSubmit(): void,
  validity: any,
}

export type onGenreChangeType = (newGenre: string) => void;

export interface Genre {
  currentGenre?: string,
  genres?: Array<string>,
  onGenreChange?: onGenreChangeType
}

export interface Location {
  hash: string,
  key?: string,
  pathname: string,
  search: string
}

export interface RouteWithProps {
  children?: React.ReactChildren,
  component: React.ElementType,
  exact?: boolean,
  path: string,
  [x: string]: any
}

export interface User {
  avatar_url: string, // eslint-disable-line
  email: string,
  id: number,
  name: string
}
