// объект с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const page = document.querySelector('.page');

const elements = page.querySelector('.elements');

const profileNameEdit = page.querySelector('.form-edit__item_field_profile-name');
const profileStatusEdit = page.querySelector('.form-edit__item_field_profile-status');
// открытие popup-а  
const profileButtonEdit = page.querySelector('.profile__button-edit');

// находим кнопку добавления
const profileButtonAdd = page.querySelector('.profile__button-add');

const popup = page.querySelector('.popup');

// закрытие popup-а 
const popupButtonClose = page.querySelector('.popup__button-close');

const popupZoomClose = page.querySelector('.popup__button-close_purpose_zoom');


// сохранение информации из форм на странице
const formElement = document.querySelector('.form-edit');

// считаем название попапа и надпись кнопки
const popupTitle = page.querySelector('.popup__title');
const popupButtonSubmit = page.querySelector('.form-edit__button');
const popupContainer = page.querySelector('.popup__container');

const popupZoomImage = page.querySelector('.popup__zoom-image');
const popupImage = page.querySelector('.popup__image');

// нашли template на странице
const cardTemplate = document.querySelector('#card-template').content;

const popupTitleZoomImage = page.querySelector('.popup__title-zoom-image');

const renderCards = element => {
  // сделали копию содержимого в новую переменную
  const cardElement = cardTemplate.cloneNode(true);

  // берем изображение и имя из объекта
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__image').alt = element.name;

  // ставим лайки
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like_active');
});

// удаляем карточку
cardElement.querySelector('.element__trash-button').addEventListener('click', function (evt) {
  evt.target.closest('.element').remove();
});

cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
  popupContainer.classList.add('popup__container_closed');
  popupZoomImage.classList.remove('popup__zoom-image_closed');
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupTitleZoomImage.textContent = evt.target.alt;
  openPopup(popup);
  console.log(evt.target.src);
});

  // добавляем на страницу
  elements.prepend(cardElement);
}



// выводим карточки
initialCards.forEach(renderCards);


// Функции

// функция открытия popup-а
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
} 

// функция закрытия popup-а 
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// пресет попапа добавления карточки
function popupAddPreset() {
  formElement.reset();
  profileNameEdit.setAttribute('placeholder', 'Название');
  profileStatusEdit.setAttribute('placeholder', 'Ссылка на картинку');
  popupTitle.textContent = 'Новое место';
  popupButtonSubmit.textContent = 'Создать';
}

// пресет попапа редактирования профиля
function popupEditPreset() {
  popupTitle.textContent = 'Редактировать профиль';
  popupButtonSubmit.textContent = 'Сохранить';
  profileNameEdit.removeAttribute('placeholder');
  profileStatusEdit.removeAttribute('placeholder');
  const profileName = document.querySelector('.profile__name').textContent;
  profileNameEdit.value = profileName;
  const profileStatus = document.querySelector('.profile__status').textContent;
  profileStatusEdit.value = profileStatus;
}

function handleFormSubmit (evt) {
  if(popupTitle.textContent === 'Новое место') {
    evt.preventDefault(); // отмена обновления окна браузера
  // находим поля формы в DOM и получаем значения полей из свойств value
  const newCardName = document.querySelector('.form-edit__item_field_profile-name').value;
  const newCardLink = document.querySelector('.form-edit__item_field_profile-status').value;

  const newCard = {name: newCardName, link: newCardLink};

  renderCards(newCard);
  closePopup(popup);
  }

  else if(popupTitle.textContent === 'Редактировать профиль') {
    evt.preventDefault(); // отмена обновления окна браузера
  // находим поля формы в DOM и получаем значения полей из свойств value
  const nameInput = document.querySelector('.form-edit__item_field_profile-name').value;
  const statusInput = document.querySelector('.form-edit__item_field_profile-status').value;
  // выберираем элементы, куда буудут вставлены значения полей
  const nameOutput = document.querySelector('.profile__name');
  const statusOutput = document.querySelector('.profile__status');
  // подставляем новые значения с помощью textContent
  nameOutput.textContent = nameInput;
  statusOutput.textContent = statusInput;
  closePopup(popup);
  }
}

// Слушатели событий

// нажатие на кнопку редактирования профиля
profileButtonEdit.addEventListener('click', function() {
  popupContainer.classList.remove('popup__container_closed');
  popupZoomImage.classList.add('popup__zoom-image_closed');
  openPopup(popup);
  popupEditPreset();
});

// нажатие на кнопку закрытия попапа
popupButtonClose.addEventListener('click', function() {
  closePopup(popup);
});

popupZoomClose.addEventListener('click', function() {
  closePopup(popup);
});

// нажатие на добавление карточки
profileButtonAdd.addEventListener('click', function() {
  popupContainer.classList.remove('popup__container_closed');
  popupZoomImage.classList.add('popup__zoom-image_closed');
  openPopup(popup);
  popupAddPreset();
});

formElement.addEventListener('submit', handleFormSubmit);