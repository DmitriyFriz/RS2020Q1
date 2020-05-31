export { getTranslate, getMovieTitle, getMovieRating };

const keys = {
  translateAPI: 'trnsl.1.1.20200503T123844Z.d17feb59a5ad941b.dafe80834afc38ce646fbd9eefe3eb50aada9fc2',
  movieAPI: '91aeb627',
};

const omdb = 'https://www.omdbapi.com';

function getTranslate(request) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keys.translateAPI}&text=${request}&lang=ru-en`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.text[0]);
}

function getMovieTitle(request, page) {
  const url = `${omdb}/?s=${request}&page=${page}&apikey=${keys.movieAPI}`;

  return fetch(url)
    .then((response) => response.json());
}

function getMovieRating(MovieId) {
  const url = `${omdb}/?i=${MovieId}&apikey=${keys.movieAPI}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.imdbRating);
}
