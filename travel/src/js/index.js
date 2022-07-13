window.addEventListener('load', pageInit);

console.log(
  '1. Слайдер изображений в секции `destinations` +50\n   - на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели(например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа) + 20\n   - Три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20\n   - Анимации плавного перемещения для слайдера +10\n2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50\n   - логин попап соответствует верстке его закрытие происходит при клике вне попапа +25\n   - логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег <form>) +25\n3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25',
);

function pageInit() {
  createLoginButtonClickListener();
  createBurgerClickListener();
  createNavClickListener();
  focusSliderOnActiveItem();
  createSliderItemClickListener();
  documentWidthChangeListener();
  createSliderDotsClickListener();
  createSliderArrowsClickListener();
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

  const buttonFacebook = createCustomElement('button', [
    'button',
    'popup__button',
    'popup__signin-btn',
    'signin-btn__facebook',
  ]);
  const facebookIcon = createCustomElement('img', 'signin-btn__icon');
  facebookIcon.src = './assets/images/login/facebook.svg';
  facebookIcon.alt = 'facebook';
  const facebookContent = createCustomElement('span', 'signin-btn__content', 'Sign In with Facebook');
  buttonFacebook.append(facebookIcon, facebookContent);

  const buttonGoogle = createCustomElement('button', [
    'button',
    'popup__button',
    'popup__signin-btn',
    'signin-btn__google',
  ]);
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
  popup.style.top = `${document.documentElement.clientHeight / 2 - popup.offsetHeight / 2}px`;
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
  const nav = document.querySelector('.burger-nav');
  nav.style.width = '165px';
  createBackgroundLayer(closeMobileNavigation);
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

function navClickHandler(event) {
  if (Array.from(event.target.classList).includes('burger-nav__link')) {
    closeMobileNavigation();
    if (Array.from(event.target.classList).includes('login')) {
      showPopup();
    }
  }
}

function closeMobileNavigation() {
  const nav = document.querySelector('.burger-nav');
  nav.style.width = '0px';
  removeNavCloseEventListener();
  removeBackgroundLayer();
  unblockPageScrolling();
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
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

function focusSliderOnActiveItem() {
  const container = document.querySelector('.slider__container');
  const activeItem = document.querySelector('.slider__item.active');
  const itemWidth = parseInt(activeItem.clientWidth);
  const itemMargin = parseInt(getComputedStyle(activeItem).marginRight);
  const documentWidth = document.documentElement.clientWidth;
  const sliderItemsCount = container.children.length;
  const sliderWidth = sliderItemsCount * itemWidth + (sliderItemsCount - 1) * itemMargin;
  const leftGap = (sliderWidth - documentWidth) / 2;
  container.style.left = `-${leftGap}px`;
}

function createSliderItemClickListener() {
  const sliderItems = document.querySelectorAll('.slider__item');
  Array.from(sliderItems).map((x) => x.addEventListener('click', sliderItemClickHandler));
}

function sliderItemClickHandler(e) {
  const container = document.querySelector('.slider__container');
  const clickedItem = e.currentTarget;
  const activeItem = document.querySelector('.slider__item.active');
  const itemWidth = parseInt(activeItem.clientWidth);
  const itemMargin = parseInt(getComputedStyle(activeItem).marginRight);

  if (!Array.from(container.classList).includes('blocked')) {
    if (activeItem.previousElementSibling === clickedItem) {
      container.classList.toggle('blocked');
      toggleSliderArrowsBlock();

      const element = container.lastElementChild.cloneNode(true);
      element.addEventListener('click', sliderItemClickHandler);

      container.style.transition = 'unset';
      container.prepend(element);
      container.style.right = `${-parseInt(container.style.left) + (itemWidth + itemMargin)}px`;
      container.style.left = 'unset';

      setTimeout(() => {
        container.style.transition = '';
        container.style.right = `${parseInt(container.style.right) - (itemWidth + itemMargin)}px`;
      }, 100);

      setTimeout(() => {
        container.style.transition = 'unset';
        container.lastElementChild.remove();
        container.style.left = `${-parseInt(container.style.right)}px`;
        container.style.right = 'unset';
        container.classList.toggle('blocked');
        toggleSliderArrowsBlock();
      }, 500);
    } else if (activeItem.nextElementSibling === clickedItem) {
      container.classList.toggle('blocked');
      toggleSliderArrowsBlock();

      const element = container.firstElementChild.cloneNode(true);
      element.addEventListener('click', sliderItemClickHandler);

      container.style.transition = 'unset';
      container.append(element);

      setTimeout(() => {
        container.style.transition = '';
        container.style.left = `${parseInt(container.style.left) - (itemWidth + itemMargin)}px`;
      }, 100);

      setTimeout(() => {
        container.style.transition = 'unset';
        container.firstElementChild.remove();
        container.style.left = `${parseInt(container.style.left) + (itemWidth + itemMargin)}px`;
        container.classList.toggle('blocked');
        toggleSliderArrowsBlock();
      }, 500);
    }

    activeItem.classList.remove('active');
    clickedItem.classList.add('active');

    const activeDot = document.querySelector('.slider__dot.active');
    activeDot.classList.remove('active');

    const clickedDot = document.querySelector(`[data-dot="${clickedItem.dataset.item}"]`);
    clickedDot.classList.add('active');
  }
}

function createSliderDotsClickListener() {
  const sliderDots = document.querySelector('.slider__dots-menu');
  sliderDots.addEventListener('click', sliderDotsClickHandler);
}

function sliderDotsClickHandler(event) {
  if (Array.from(event.target.classList).includes('slider__dot')) {
    const clickedDot = event.target;
    const itemNumber = `${clickedDot.dataset.dot}`;
    const linkedItem = document.querySelector(`[data-item="${itemNumber}"`);
    linkedItem.click();
  }
}

function createSliderArrowsClickListener() {
  const sliderArrows = document.querySelector('.slider__arrows');
  sliderArrows.addEventListener('click', sliderArrowsClickHandler);
}

function sliderArrowsClickHandler(event) {
  if (event.target.closest('.slider__arrow')) {
    const clickedArrow = event.target.closest('.slider__arrow');
    if (Array.from(clickedArrow.classList).includes('slider__prev')) {
      document.querySelector('.slider__item.active').previousElementSibling.click();
    } else if (Array.from(clickedArrow.classList).includes('slider__next')) {
      document.querySelector('.slider__item.active').nextElementSibling.click();
    }
  }
}

function toggleSliderArrowsBlock() {
  Array.from(document.querySelectorAll('.slider__controls')).map((x) => {
    x.classList.toggle('slider__controls_active');
  });
}

function documentWidthChangeListener() {
  window.addEventListener('resize', () => {
    setTimeout(focusSliderOnActiveItem, 500);
    if (document.querySelector('.popup')) {
      setTimeout(setPopupTopGap, 500);
    }
  });
}
