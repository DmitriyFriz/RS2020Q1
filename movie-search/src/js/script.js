import '../style/style.css';
import Swiper from './swiper.min.js';
import { getTranslate, getMovieTitle, getMovieRating } from './api.services.js';
import posterDefault from '../assets/img/poster-default.png';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear-button');
const searchResult = document.getElementById('search-result');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const preloader = document.querySelector('.preloader-wrapper');
const regExpRussian = /[а-я]/i;
let requestPage = 1;
let totalPage = 1;
let movieName = 'Harry';
let searchRequest = null;
let wasTranslate = false;
const errorTypes = {
  limit: 'Request limit reached!',
  notMovie: 'Movie not found!',
  manyResults: 'Too many results.',
};

const movieSwiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 500,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});

clearButton.addEventListener('click', () => {
  searchForm.reset();
});

searchButton.addEventListener('click', () => {
  movieName = searchInput.value.trim();
  if (movieName.length) {
    searchResult.textContent = '';
    requestPage = 1;
    searchMovieInfo()
      .then(handelMovieInfo)
      .catch(handelMovieError);
  }
});

movieSwiper.on('reachEnd', () => {
  requestPage++;
  if (requestPage <= totalPage) {
    searchMovieInfo()
      .then(handelMovieInfo)
      .catch(handelMovieError);
  }
});

searchMovieInfo()
  .then(handelMovieInfo)
  .catch(handelMovieError);

function creatMovieSlide(id, title, posterSrc, year, rating) {
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');

  const card = document.createElement('div');
  card.classList.add('card');

  const titleMovie = document.createElement('a');
  titleMovie.classList.add('movie-title');
  titleMovie.href = `https://www.imdb.com/title/${id}/videogallery`;
  titleMovie.textContent = title;

  const posterMovie = document.createElement('div');
  posterMovie.classList.add('movie-poster');
  const poster = (posterSrc === 'N/A') ? posterDefault : posterSrc;

  const yearMovie = document.createElement('p');
  yearMovie.textContent = year;

  const ratingMovie = document.createElement('div');
  ratingMovie.classList.add('movie-rating');
  ratingMovie.textContent = rating;

  return new Promise((resolve) => {
    const img = new Image();
    img.src = poster;
    posterMovie.style.backgroundImage = `url(${img.src})`;
    card.append(titleMovie, posterMovie, yearMovie, ratingMovie);
    slide.append(card);
    img.addEventListener('load', () => {
      resolve(slide);
    });
  });
}

function searchMovieInfo() {
  preloader.classList.add('visibility');
  wasTranslate = false;
  if (requestPage === 1) {
    if (regExpRussian.test(movieName)) {
      searchRequest = getTranslate(movieName);
      wasTranslate = true;
      searchRequest
        .then((data) => { movieName = data; });
    } else {
      searchRequest = Promise.resolve(movieName);
    }
  }

  return searchRequest
    .then((data) => getMovieTitle(data, requestPage))
    .then((data) => {
      if (data.Response === 'False') return Promise.reject(data.Error);
      totalPage = Math.ceil(data.totalResults / 10);
      const movieArr = data.Search;
      const movieRating = Promise.all(movieArr.map((movie) => getMovieRating(movie.imdbID)));
      return Promise.all([movieArr, movieRating]);
    });
}

function handelMovieInfo(data) {
  const [movieArr, movieRating] = data;
  const movieSlides = Promise.all(movieArr.map((movie, index) => creatMovieSlide(movie.imdbID, movie.Title, movie.Poster, movie.Year, movieRating[index])));
  movieSlides
    .then((slides) => {
      if (requestPage === 1) {
        swiperWrapper.innerHTML = '';
        movieSwiper.slideTo(0, false);
      }
      movieSwiper.appendSlide(slides);
      if (wasTranslate) searchResult.textContent = `Showing results for "${movieName}"`;
      preloader.classList.remove('visibility');
    });
}

function handelMovieError(error) {
  switch (error) {
    case errorTypes.notMovie:
      searchResult.textContent = `No results for "${movieName}"`;
      break;
    case errorTypes.limit:
      alert(`${error} Try again tomorrow!`);
      searchResult.textContent = `${error} Try again tomorrow!`;
      break;
    case errorTypes.manyResults:
      searchResult.textContent = `${error} Give more details!`;
      break;
    default:
      break;
  }
  preloader.classList.remove('visibility');
}
