window.addEventListener('load', pageInit);

console.log(
  '1. Вёрстка соответствует макету. Ширина экрана 390px +48\n   - блок `<header>` +6\n   - секция `preview` +9\n   - секция `steps` +9\n   - секция `destinations` +9\n   - секция `stories` +9\n   - блок `<footer>` +6\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n   - нет полосы прокрутки при ширине страницы от 1440рх до 390px +7\n   - нет полосы прокрутки при ширине страницы от 390px до 320рх +8\n3. На ширине экрана 390рх и меньше реализовано адаптивное меню +22\n   - при ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка +2\n   - при нажатии на бургер-иконку плавно появляется адаптивное меню +4\n   - адаптивное меню соответствует макету +4\n   - при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4\n   - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4 (все кроме Account, она пока что просто закрывает меню)\n   - при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4\n',
);

function pageInit() {
  createBurgerClickListener();
  createNavClickListener();
}

function createBurgerClickListener() {
  document.querySelector('.burger-menu').addEventListener('click', showMobileNavigation);
}

function showMobileNavigation() {
  const nav = document.querySelector('.burger-nav');
  nav.style.width = '165px';
  createBackgroundLayer();
  scrollToTop();
  blockPageScrolling();
  createNavCloseEventListener();
}

function createNavCloseEventListener() {
  document.querySelector('.burger-nav__close').addEventListener('click', closeMobileNavigation);
}

function removeNavCloseEventListener() {
  document.querySelector('.burger-nav__close').removeEventListener('click', closeMobileNavigation);
}

function createNavClickListener() {
  const nav = document.querySelector('.burger-nav');
  nav.addEventListener('click', navClickHandler);
}

function navClickHandler(ev) {
  if (Array.from(ev.target.classList).includes('burger-nav__link')) {
    closeMobileNavigation();
  }
}

function closeMobileNavigation(ev) {
  const nav = document.querySelector('.burger-nav');
  nav.style.width = '0px';
  removeNavCloseEventListener();
  removeBackgroundLayer();
  unblockPageScrolling();
}

function createBackgroundLayer() {
  const layer = document.createElement('div');
  layer.classList.add('background-layer');
  layer.style.height = `${calcPageHeight()}px`;
  layer.addEventListener('click', closeMobileNavigation);
  document.body.prepend(layer);
}

function removeBackgroundLayer() {
  const layer = document.querySelector('.background-layer');
  layer.remove();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function blockPageScrolling() {
  document.body.style.overflow = 'hidden';
}

function unblockPageScrolling() {
  document.body.style.overflow = 'auto';
}

function calcPageHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );
}
