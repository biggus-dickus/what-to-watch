import {Genre} from './genres';

export const films = [
  {
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: [Genre.FAMILY],
    picUrl: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    name: `Bohemian Rhapsody`,
    genre: [Genre.DOCUMENTARY],
    picUrl: `img/bohemian-rhapsody.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    name: `Macbeth`,
    genre: [Genre.DRAMAS],
    picUrl: `img/macbeth.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4%2FCam-Man.mp4`
  },
  {
    name: `Aviator`,
    genre: [Genre.DRAMAS, Genre.ROMANCE],
    picUrl: `img/aviator.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5b/Marnie_%281964%29_trailer.webm/Marnie_%281964%29_trailer.webm.360p.vp9.webm`
  },
  {
    name: `We need to talk about Kevin`,
    genre: [Genre.DRAMAS],
    picUrl: `img/we-need-to-talk-about-kevin.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5b/Marnie_%281964%29_trailer.webm/Marnie_%281964%29_trailer.webm.360p.vp9.webm`
  },
  {
    name: `What We Do in the Shadows`,
    genre: [Genre.DOCUMENTARY, Genre.HORROR, Genre.COMEDIES],
    picUrl: `img/what-we-do-in-the-shadows.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/2/23/Dr_Strangelove_-_Official_Trailer.webm/Dr_Strangelove_-_Official_Trailer.webm.480p.vp9.webm`
  },
  {
    name: `Revenant`,
    genre: [Genre.THRILLERS],
    picUrl: `img/revenant.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4/Harvesting%20Rice.mp4`
  },
  {
    name: `Johny English`,
    genre: [Genre.COMEDIES],
    picUrl: `img/johnny-english.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4/Lake%20Day.mp4`
  },
  {
    name: `Shutter Island`,
    genre: [Genre.DRAMAS, Genre.THRILLERS],
    picUrl: `img/shutter-island.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4/Deserted%20Island.mp4`
  },
  {
    name: `Pulp Fiction`,
    genre: [Genre.CRIME, Genre.COMEDIES],
    picUrl: `img/pulp-fiction.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4/Stunning%20Mountains.mp4`
  },
  {
    name: `No Country for Old Men`,
    genre: [Genre.DRAMAS, Genre.THRILLERS],
    picUrl: `img/no-country-for-old-men.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4/Gubat%20Beach.mp4`
  },
  {
    name: `Snatch`,
    genre: [Genre.CRIME, Genre.COMEDIES],
    picUrl: `img/snatch.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `etc/na-zdorovnya.mp4`
  },
  {
    name: `Moonrise Kingdom`,
    genre: [Genre.COMEDIES, Genre.DRAMAS],
    picUrl: `img/moonrise-kingdom.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4/Caramoan%20Drone.mp4`
  },
  {
    name: `Seven Years in Tibet`,
    genre: [Genre.DOCUMENTARY, Genre.DRAMAS],
    picUrl: `img/seven-years-in-tibet.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4/Ants%20Walking.mp4`
  },
  {
    name: `Midnight Special`,
    genre: [Genre.DRAMAS],
    picUrl: `img/midnight-special.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4/Boat%20in%20Caramoan.mp4`
  },
  {
    name: `War of the Worlds`,
    genre: [Genre.SCI_FI],
    picUrl: `img/war-of-the-worlds.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4/Blue%20Joy.mp4`
  },
  {
    name: `Dardjeeling Limited`,
    genre: [Genre.DRAMAS],
    picUrl: `img/dardjeeling-limited.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4/Stop-Sign.mp4`
  },
  {
    name: `Orlando`,
    genre: [Genre.DRAMAS],
    picUrl: `img/orlando.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4/Steaming-Yellowstone.mp4`
  },
  {
    name: `Mindhunter`,
    genre: [Genre.CRIME, Genre.DRAMAS, Genre.THRILLERS],
    picUrl: `img/mindhunter.jpg`,
    pageUrl: `https://thepiratebay.org`,
    videoUrl: `https://storage.googleapis.com/coverr-main/mp4/California-Desert.mp4`
  }
];

export const getByGenre = (genre, filmsList = films) => filmsList.filter((film) => film.genre.includes(genre));
