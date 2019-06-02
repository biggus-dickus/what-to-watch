const FilmDataAdapter = (data) => {
  return {
    bgColor: data.background_color,
    bgImage: data.background_image,
    description: data.description,
    director: data.director,
    genre: data.genre,
    id: data.id,
    isFavourite: data.is_favorite,
    name: data.name,
    pageUrl: `/${data.name.toLowerCase().replace(/[. ,:-]+/g, `-`)}`,
    posterImage: data.poster_image,
    previewImage: data.preview_image,
    previewVideo: data.preview_video_link,
    rating: data.rating,
    released: data.released,
    runTime: data.runTime,
    scoresCount: data.scores_count,
    starring: data.starring,
    video: data.video_link,
  };
};

export default FilmDataAdapter;
