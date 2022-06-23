console.log(
  '1. Вёрстка валидная +10\n2. Вёрстка семантическая +20\n   В коде странице присутствуют следующие элементы (указано минимальное количество, может быть больше):\n   - <header>, <main>, <footer> +3\n   - четыре элемента <section> (по количеству секций) +3\n   - только один заголовок <h1> +3\n   - три заголовка <h2> (количество секций минус одна, у которой заголовок <h1>) +3\n   - один элемент <nav> (панель навигации) +3\n   - два списка ul > li > a (панель навигации, ссылки на соцсети) +3\n   - четыре кнопки <button> +2\n3. Вёрстка соответствует макету +48\n   - блок <header> +6\n   - секция preview +9\n   - секция steps +9\n   - секция destinations +9\n   - секция stories +9\n   - блок <footer> +6 \n4. Требования к css + 12\n   - для построения сетки используются флексы или гриды +2\n   - при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2\n   - фоновый цвет тянется на всю ширину страницы +2\n   - иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2\n   - изображения добавлены в формате .jpg +2\n   - есть favicon +2\n5. Интерактивность, реализуемая через css +20\n   - плавная прокрутка по якорям +5\n   - ссылки в футере ведут на гитхаб автора проекта и на страницу курса https://rs.school/js-stage0/ +5\n   - интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +5\n   - обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5\nTotal: 110 / 110 pts.',
);

function pageInit() {
  createLoginButtonClickListener();
  createBurgerClickListener();
  createNavClickListener();
  createSliderClickListener();
}

function createLoginButtonClickListener() {
  document.querySelector('.login-button').addEventListener('click', showPopup);
}

function showPopup() {
  const popup = getPopup();
  document.body.prepend(popup);
  setPopupTopGap();
  createBackgroundLayer(closePopup);
  scrollToTop();
  createRegisterEventListener();
}

function getPopup() {
  return createPopup();
}

function createPopup() {
  const popup = createCustomElement('div', 'popup');
  const popupWrapper = createCustomElement('div', 'popup__wrapper');
  const popupTitle = createCustomElement('p', 'popup__title', 'Log in to your account');

  const buttonFacebook = createCustomElement(
    'button',
    ['button', 'popup__button', 'popup__signin-btn', 'signin-btn__facebook']
  );
  const facebookIcon = createCustomElement('img', 'signin-btn__icon');
  facebookIcon.src = './assets/images/login/facebook.svg';
  facebookIcon.alt = 'facebook';
  const facebookContent = createCustomElement('span', 'signin-btn__content', 'Sign In with Facebook');
  buttonFacebook.append(facebookIcon, facebookContent);

  const buttonGoogle = createCustomElement(
    'button',
    ['button', 'popup__button', 'popup__signin-btn', 'signin-btn__google']
  );
  const googleIcon = createCustomElement('img', 'signin-btn__icon');
  googleIcon.src = './assets/images/login/google.svg';
  googleIcon.alt = 'google';
  const googleContent = createCustomElement('span', 'signin-btn__content', 'Sign In with Google');
  buttonGoogle.append(googleIcon, googleContent);

  const textSeparator = createCustomElement('p', 'popup__text-separator', 'or');

  const popupForm = createCustomElement('form', 'popup__signin-form');
  popupForm.action = '';

  const emailWrapper = createCustomElement('div', 'form__email-wrapper');
  const [emailLabel, emailInput] = createCustomInput('form__label', 'E-mail', 'email', 'form__input');
  emailWrapper.append(emailLabel, emailInput);

  const passwordWrapper = createCustomElement('div', 'form__password-wrapper');
  const [passwordLabel, passwordInput] = createCustomInput('form__label', 'Password', 'password', 'form__input');
  passwordWrapper.append(passwordLabel, passwordInput);

  const signinButton = createCustomElement(
    'button',
    ['button', 'popup__button', 'form__button', 'popup__form-btn'],
    'Sign In',
  );
  popupForm.append(emailWrapper, passwordWrapper, signinButton);

  const resetPassword = createCustomElement('p', 'popup__password-reset', 'Forgot Your Password?');
  const emptySeparator = createCustomElement('div', 'popup__empty-separator');

  const signupProposalWrapper = createCustomElement('div', 'popup__signup-proposal');
  const signupProposalContent = createCustomElement('p', 'signup-proposal__content', 'Don’t have an account?');
  const signupProposalLink = createCustomElement('p', 'signup-proposal__link', 'Register');
  signupProposalWrapper.append(signupProposalContent, signupProposalLink);

  popupWrapper.append(
    popupTitle,
    buttonFacebook,
    buttonGoogle,
    textSeparator,
    popupForm,
    resetPassword,
    emptySeparator,
    signupProposalWrapper,
  );
  popup.append(popupWrapper);
  return popup;
}

function closePopup() {
  removePopup();
  removeBackgroundLayer();
}

function removePopup() {
  const popup = document.querySelector('.popup');
  popup.remove();
}

function createRegisterEventListener() {
  const register = document.querySelector('.popup__signup-proposal');
  register.addEventListener('click', changePopupContent);
}

function setPopupTopGap() {
  const popup = document.querySelector('.popup');
  popup.style.top = `${(document.documentElement.clientHeight / 2) - (popup.offsetHeight / 2)}px`;
}

function changePopupContent() {
  const popup = document.querySelector('.popup');
  popup.classList.toggle('reg');

  const title = document.querySelector('.popup__title');
  const facebookBtn = document.querySelector('.signin-btn__facebook .signin-btn__content');
  const googleBtn = document.querySelector('.signin-btn__google .signin-btn__content');
  const formBtn = document.querySelector('.popup__form-btn');
  const propContent = document.querySelector('.signup-proposal__content');
  const propLink = document.querySelector('.signup-proposal__link');

  if (Array.from(popup.classList).includes('reg')) {
    title.textContent = 'Register a new account';
    facebookBtn.textContent = 'Sign Up with Facebook';
    googleBtn.textContent = 'Sign Up with Google';
    formBtn.textContent = 'Sign Up';
    propContent.textContent = 'Already have an account?';
    propLink.textContent = 'Log in';
  } else {
    title.textContent = 'Log in to your account';
    facebookBtn.textContent = 'Sign In with Facebook';
    googleBtn.textContent = 'Sign In with Google';
    formBtn.textContent = 'Sign In';
    propContent.textContent = 'Don’t have an account?';
    propLink.textContent = 'Register';
  }
}

function createBurgerClickListener() {
  document.querySelector('.burger-menu').addEventListener('click', showMobileNavigation);
}

function showMobileNavigation() {
  const nav = document.querySelector('.nav');
  nav.style.right = '0px';
  createBackgroundLayer(closeMobileNavigation);
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

function closeMobileNavigation() {
  const nav = document.querySelector('.nav');
  nav.style.right = '-165px';
  removeNavCloseEventListener();
  removeBackgroundLayer();
}

function createBackgroundLayer(func) {
  const layer = document.createElement('div');
  layer.classList.add('background-layer');
  layer.style.height = `${calcPageHeight()}px`;
  layer.addEventListener('click', func);
  document.body.prepend(layer);
  blockPageScrolling();
}

function removeBackgroundLayer() {
  const layer = document.querySelector('.background-layer');
  layer.remove();
  unblockPageScrolling();
}

function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function blockPageScrolling() {
  document.body.style.overflow = 'hidden';
}

function unblockPageScrolling() {
  document.body.style.overflow = 'auto';
}

function createCustomElement(tag, classList, content = '') {
  const element = document.createElement(tag);
  if (typeof classList === 'string') {
    element.classList.add(classList);
  } else {
    Array.from(classList).map((x) => element.classList.add(x));
  }
  element.textContent = content;
  return element;
}

function createCustomInput(labelClass, labelText, labelID, inputClass) {
  const label = createCustomElement('label', labelClass, labelText);
  label.for = labelID;
  const input = createCustomElement('input', inputClass);
  input.id = labelID;
  input.type = labelID;
  input.name = labelID;
  input.required = 'true';
  return [label, input];
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

function createSliderClickListener() {
  const sliderItems = document.querySelectorAll('.slider__item');
  Array.from(sliderItems).map((x) => x.addEventListener('click', sliderItemClickHandler));
}

function sliderItemClickHandler(e) {
  const container = document.querySelector('.slider__container');
  const clickedItem = e.currentTarget;
  const activeItem = document.querySelector('.slider__item.active');
  const gap = container.offsetLeft;

  if (activeItem.previousElementSibling === clickedItem) {
    function changeItems() {
      container.removeEventListener('transitionend', changeItems);
      container.lastElementChild.remove();
      container.prepend(element);
      container.style.transition = 'unset';
      container.style.left = `${-800 - 60 - gap}px`;

      setTimeout(() => {
        container.style.transition = '';
        container.style.left = '0px';
      activeItem.classList.remove('active');
      clickedItem.classList.add('active');
      }, 10);
    }

    const element = container.lastElementChild.cloneNode(true);
    element.addEventListener('click', sliderItemClickHandler);
    container.addEventListener('transitionend', changeItems);
    container.style.left = `${-gap}px`;
  } else if (activeItem.nextElementSibling === clickedItem) {
    function changeItems() {
      container.removeEventListener('transitionend', changeItems);
      container.firstElementChild.remove();
      container.append(element);
      container.style.transition = 'unset';
      container.style.left = `${800 + 60 + gap}px`;

      setTimeout(() => {
        container.style.transition = '';
        container.style.left = '0px';
        activeItem.classList.remove('active');
        clickedItem.classList.add('active');
      }, 10);
    }

    const element = container.firstElementChild.cloneNode(true);
    element.addEventListener('click', sliderItemClickHandler);
    container.addEventListener('transitionend', changeItems);
    container.style.left = `${gap}px`;
  }

  const activeDot = document.querySelector('.slider__dot.active');
  activeDot.classList.remove('active');

  const clickedDot = document.querySelector(`[data-dot="${clickedItem.dataset.item}"]`);
  clickedDot.classList.add('active');
}

pageInit();
