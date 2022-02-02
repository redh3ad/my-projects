console.log(`[+] 1. Вёрстка +10
[+] - на странице есть несколько карточек фильмов и строка поиска. На каждой карточке фильма есть постер и название фильма. Также на карточке может быть другая информация, которую предоставляет API, например, описание фильма, его рейтинг на IMDb и т.д. +5
[+] - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
[+] 2. При загрузке приложения на странице отображаются карточки фильмов +10
[+] 3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10
[+] 4. Поиск +30
[+] - при открытии приложения курсор находится в поле ввода +5
[+] - есть placeholder +5
[+] - автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
[+] - поисковый запрос можно отправить нажатием клавиши Enter +5   
[+] - после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
[+] - в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
[+] 5. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
[+] - высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
[+] - дополнительным функционалом может быть, например, наличие на карточке фильма его описания и рейтинга на IMDb
Score: 70/60`);

const API_KEY = 'bffa73bc7fbb4c5dbb408414e08b7471';
const API_POPULAR = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=`;

const state = {
  total_pages: 1,
  page: 1,
  url: 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bffa73bc7fbb4c5dbb408414e08b7471&page=',
};

//! FETCH MOVIES JSON
async function getMovies(url, page = 1, state) {
  try {
    const URL = url + page;
    const responce = await fetch(URL);
    const movies = await responce.json();
    state.total_pages = movies.total_pages;
    state.page = movies.page;
    state.url = url;
    const pageNumber = document.querySelector('.page__number');
    pageNumber.textContent = `${state.page} of ${movies.total_pages}`;

    return showMovies(movies);
  } catch (e) {
    console.log(e);
    const moviesConteiner = document.querySelector('.main__container');
    moviesConteiner.innerHTML = `<h2 style='color: #7378c5; font-size: 30px; margin-top: 55px; max-width: 1000px;'>ERROR! ${e}! Reload the page, please!</h2>`;
  }
}
getMovies(state.url, 1, state); //call popular movies on start page

//! MOVIES RATE COLORs
function setColorRating(rate) {
  if (rate >= 8) {
    return 'green';
  } else if (rate > 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

//! PAGES CHANGER
function plusPage(state) {
  if (state.total_pages >= 2) {
    let page = state.page;
    page = page + 1;
    const pageNumber = document.querySelector('.page__number');
    pageNumber.textContent = `${page} of ${state.total_pages}`;
    return getMovies(state.url, page, state);
  }
}

function minusPage(state) {
  if (state.total_pages >= 2 && state.page > 1) {
    let page = state.page;
    page = page - 1;
    const pageNumber = document.querySelector('.page__number');
    pageNumber.textContent = `${page} of ${state.total_pages}`;
    return getMovies(state.url, page, state);
  }
}

const prevPage = document.querySelector('.fa-caret-square-left');
prevPage.addEventListener('click', minusPage.bind(null, state));

const nextPage = document.querySelector('.fa-caret-square-right');
nextPage.addEventListener('click', plusPage.bind(null, state));

//! CREATE MOVIES at PAGE
function showMovies(movies) {
  const moviesConteiner = document.querySelector('.main__container');
  moviesConteiner.innerHTML = '';
  if (movies.results.length > 0) {
    movies.results.forEach((movie) => {
      if (movie.original_title && movie.poster_path && movie.overview) {
        const movieEl = document.createElement('div');
        movieEl.classList.add('film');
        movieEl.innerHTML = `<img src="https://image.tmdb.org/t/p/w1280${
          movie.poster_path
        }" alt="${movie.vote_average}" />
          <div class="film__info">
            <h3>${movie.original_title}</h3>
            <span class="${setColorRating(movie.vote_average)}">${
          movie.vote_average
        }</span>
          </div>
          <div class="film__description">
            <h3>Overview</h3>
            <p>${movie.overview}</p>
            <h4>Date of release:</h4>
            <p>${movie.release_date}</p>
          </div>
          `;
        moviesConteiner.appendChild(movieEl);
      }
    });
  } else {
    moviesConteiner.innerHTML = `<h2 style='color: #7378c5; font-size: 30px; margin-top: 55px;'>Nothing found, please try again!</h2>`;
  }
}

//! SEARCH MOVIES
const form = document.querySelector('.header__form');
const input = document.querySelector('.form__input-search');

function searchMovies(state, e) {
  e.preventDefault();
  const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=bffa73bc7fbb4c5dbb408414e08b7471&query=${input.value}&page=`;

  if (input.value) {
    state.url = API_SEARCH;
    getMovies(API_SEARCH, 1, state);
  }
}

form.addEventListener('submit', searchMovies.bind(null, state));

//! INPUT CROSS CLEANER
const cross = document.querySelector('.fas');
cross.addEventListener('click', () => {
  input.value = '';
  input.focus();
});

//! PAGE UP and PAGE DOWN
const pageUp = document.querySelector('.fa-arrow-alt-circle-up');
pageUp.addEventListener('click', () => {
  window.scrollTo(0, 0);
});

const pageDown = document.querySelector('.fa-arrow-alt-circle-down');
pageDown.addEventListener('click', () => {
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  window.scrollTo(0, scrollHeight);
});
