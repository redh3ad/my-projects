console.log(
  'Score: 85/75\n[+] Вёрстка соответствует макету. Ширина экрана 768px +48\n[+] блок <header> +6\n[+] секция hero +6\n[+] секция skills +6\n[+] секция portfolio +6\n[+] секция video +6\n[+] секция price +6\n[+] секция contacts +6\n[+] блок <footer> +6\n[+] Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15\n[+] нет полосы прокрутки при ширине страницы от 1440рх до 768рх +5\n[+] нет полосы прокрутки при ширине страницы от 768рх до 480рх +5\n[+] нет полосы прокрутки при ширине страницы от 480рх до 320рх +5\n[+] На ширине экрана 768рх и меньше реализовано адаптивное меню +22\n[+] при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2\n[+] при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4\n[+] высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4\n[+] при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4\n[+] бургер-иконка, которая при клике превращающается в крестик, создана при помощи css-анимаций без использования изображений +2\n[+] ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2\nпри клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4'
);

//***BURGER MENU

const nav = document.querySelector('.header__nav');
const burger = document.querySelector('.header__burger');
const overlay = document.querySelector('.burger__overlay');
const links = document.querySelectorAll('.nav-link');

burger.onclick = () => {
  if (
    nav.classList.contains('hidden') &&
    overlay.classList.contains('hidden')
  ) {
    nav.classList.remove('hidden');
    burger.classList.add('transform-line');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } else {
    nav.classList.add('hidden');
    burger.classList.remove('transform-line');
    overlay.classList.add('hidden');
    document.body.style.overflow = 'visible';
  }
};

overlay.onclick = () => {
  nav.classList.add('hidden');
  burger.classList.remove('transform-line');
  overlay.classList.add('hidden');
  document.body.style.overflow = 'visible';
};

links.forEach(
  (link) =>
    (link.onclick = () => {
      nav.classList.add('hidden');
      burger.classList.remove('transform-line');
      overlay.classList.add('hidden');
      document.body.style.overflow = 'visible';
    })
);

//***CHANGE IMAGES IN PORTFOLIO

//preloader for images
const seasons = ['winter', 'spring', 'summer', 'autumn'];

function preloadImages(array) {
  array.forEach((season) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${season}/${i}.jpg`;
    }
  });
}
preloadImages(seasons);

const btnsPortfolio = document.querySelectorAll('.portfolio-button');
const portfolioImages = document.querySelectorAll('.portfolio-img');

btnsPortfolio.forEach((btn) => {
  btn.addEventListener('click', function () {
    //btn
    let current = document.getElementsByClassName('button_active');
    current[0].classList.remove('button_active');
    this.classList.add('button_active');
    //img
    let season = this.value;
    for (let i = 1; i <= 6; i++) {
      portfolioImages[i - 1].src = `./assets/img/${season}/${i}.jpg`;
    }
  });
});

//***CHANGE LANGUAGES ON PAGE
import langWords from './translate.js';

const langs = document.querySelectorAll('.page-lang');

let langPage = 'en';

function getLang(lang) {
  const langEn = document.querySelector('.en');
  const langRu = document.querySelector('.ru');
  if (lang === 'en') {
    for (let key in langWords[lang]) {
      let element = document.getElementById(`${key}`);
      element.textContent = langWords['en'][`${key}`];
    }
    langEn.classList.add('lang-active');
    langRu.classList.remove('lang-active');
    langPage = 'en';
  } else if (lang === 'ru') {
    for (let key in langWords[lang]) {
      let element = document.getElementById(`${key}`);
      element.textContent = langWords['ru'][`${key}`];
    }
    langRu.classList.add('lang-active');
    langEn.classList.remove('lang-active');
    langPage = 'ru';
  }
}

langs.forEach((lang) => {
  lang.addEventListener('click', function () {
    let currentLang = document.getElementsByClassName('lang-active');
    currentLang[0].classList.remove('lang-active');
    this.classList.add('lang-active');

    let language = this.textContent;
    langPage = language;
    if (language === 'en') {
      for (let key in langWords[language]) {
        let element = document.getElementById(`${key}`);
        element.textContent = langWords['en'][`${key}`];
      }
    } else if (language === 'ru') {
      for (let key in langWords[language]) {
        let element = document.getElementById(`${key}`);
        element.textContent = langWords['ru'][`${key}`];
      }
    }
  });
});

//***BUTTON ANIMATIONS

const buttons = document.querySelectorAll('.button');

buttons.forEach((button) => {
  button.addEventListener('click', function (e) {
    const x = e.clientX;
    const y = e.clientY;

    let rect = this.getBoundingClientRect();

    const buttonTop = rect.top;
    const buttonLeft = rect.left;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
  });
});

//***CHANGE PAGE THEMEs
let themePage;

const themesSwitcher = document.querySelector('.themes-switcher');
const pageBody = document.getElementById('body');
const themeOne = document.querySelector('.theme1');
const themeTwo = document.querySelector('.theme2');

function getTheme(theme) {
  if (theme === 'black') {
    themeOne.classList.add('black');
    themeOne.classList.remove('light');
    themeTwo.classList.remove('black');
    themeTwo.classList.add('light');
    pageBody.classList.remove('light-theme');
    themePage = 'black';
  } else if (theme === 'light') {
    themeOne.classList.remove('black');
    themeOne.classList.add('light');
    themeTwo.classList.add('black');
    themeTwo.classList.remove('light');
    pageBody.classList.add('light-theme');
    themePage = 'light';
  }
}

function setTheme() {
  if (themeOne.classList.contains('black')) {
    themeOne.classList.remove('black');
    themeOne.classList.add('light');
    themeTwo.classList.add('black');
    themeTwo.classList.remove('light');
    pageBody.classList.add('light-theme');
    themePage = 'light';
  } else if (themeOne.classList.contains('light')) {
    themeOne.classList.add('black');
    themeOne.classList.remove('light');
    themeTwo.classList.remove('black');
    themeTwo.classList.add('light');
    pageBody.classList.remove('light-theme');
    themePage = 'black';
  }
}

themesSwitcher.addEventListener('click', setTheme);

//***LOCAL STORAGE

function setLocalStorage() {
  localStorage.setItem('lang', langPage);
  localStorage.setItem('theme', themePage);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('lang') && localStorage.getItem('theme')) {
    const lang = localStorage.getItem('lang');
    const theme = localStorage.getItem('theme');
    getLang(lang);
    getTheme(theme);
  }
}
window.addEventListener('load', getLocalStorage);
