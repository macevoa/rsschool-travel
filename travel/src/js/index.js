window.addEventListener('load', pageInit);

console.log(
  '1. Вёрстка валидная +10\n2. Вёрстка семантическая +20\n   В коде странице присутствуют следующие элементы (указано минимальное количество, может быть больше):\n   - <header>, <main>, <footer> +3\n   - четыре элемента <section> (по количеству секций) +3\n   - только один заголовок <h1> +3\n   - три заголовка <h2> (количество секций минус одна, у которой заголовок <h1>) +3\n   - один элемент <nav> (панель навигации) +3\n   - два списка ul > li > a (панель навигации, ссылки на соцсети) +3\n   - четыре кнопки <button> +2\n3. Вёрстка соответствует макету +48\n   - блок <header> +6\n   - секция preview +9\n   - секция steps +9\n   - секция destinations +9\n   - секция stories +9\n   - блок <footer> +6 \n4. Требования к css + 12\n   - для построения сетки используются флексы или гриды +2\n   - при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2\n   - фоновый цвет тянется на всю ширину страницы +2\n   - иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2\n   - изображения добавлены в формате .jpg +2\n   - есть favicon +2\n5. Интерактивность, реализуемая через css +20\n   - плавная прокрутка по якорям +5\n   - ссылки в футере ведут на гитхаб автора проекта и на страницу курса https://rs.school/js-stage0/ +5\n   - интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +5\n   - обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5\nTotal: 110 / 110 pts.',
);

function pageInit() {
  setPageHeightStyle();
  createBurgerClickListener();
  createNavClickListener();
}

function setPageHeightStyle() {
  document.documentElement.style.height = `${calcPageHeight() - 251}px`;
}

function createBurgerClickListener() {
  document.querySelector('.burger-menu').addEventListener('click', showMobileNavigation);
}

function showMobileNavigation() {
  const nav = document.querySelector('.nav');
  nav.style.right = '0px';
  createBackgroundLayer();
  scrollToTop();
  blockPageScrolling();
  createNavCloseEventListener();
}

function createNavCloseEventListener() {
  document.querySelector('.nav__close').addEventListener('click', closeMobileNavigation);
}

function removeNavCloseEventListener() {
  document.querySelector('.nav__close').removeEventListener('click', closeMobileNavigation);
}

function createNavClickListener() {
  const nav = document.querySelector('.nav');
  nav.addEventListener('click', navClickHandler);
}

function navClickHandler(ev) {
  if (Array.from(ev.target.classList).includes('nav__link')) {
    closeMobileNavigation();
  }
}

function closeMobileNavigation(ev) {
  const nav = document.querySelector('.nav');
  nav.style.right = '-165px';
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
