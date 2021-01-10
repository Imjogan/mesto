// Переменные

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

const elements = document.querySelector('.elements');

let page = document.querySelector('.page');
// находим поля формы для ввода данных страницы
let profileNameEdit = document.querySelector('.form-edit__item_field_profile-name');
let profileStatusEdit = document.querySelector('.form-edit__item_field_profile-status');
// открытие popup-а  
let profileButtonEdit = page.querySelector('.profile__button-edit');

// находим кнопку добавления
let profileButtonAdd = document.querySelector('.profile__button-add');

let popup = page.querySelector('.popup');
// закрытие popup-а 
let popupButtonClose = page.querySelector('.popup__button-close');
// сохранение информации из форм на странице
let formElement = document.querySelector('.form-edit');

// считаем название попапа и надпись кнопки
let popupTitle = page.querySelector('.popup__title');
let popupButtonSubmit = page.querySelector('.form-edit__button');
const popupContainer = page.querySelector('.popup__container');

// нашли template на странице
const cardTemplate = document.querySelector('#card-template').content;


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
  popupContainer.classList.add('.popup__container_image-zoom');
  popupTitle.classList.add('.popup__title_image-zoom');
  formElement.classList.add('.form-edit_image-zoom');
  popupContainer.classList.add('.popup_image-zoom');
  document.querySelector('.popup_image-opened').style.backgroundImage =  `url(${evt.target.src})`;
  openPopup(popup);
  console.log(evt.target);
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
  profileNameEdit.value = '';
  profileStatusEdit.value = '';
  popupTitle.textContent = 'Новое место';
  popupButtonSubmit.textContent = 'Создать';
}

// пресет попапа редактирования профиля
function popupEditPreset() {
  popupTitle.textContent = 'Редактировать профиль';
  popupButtonSubmit.textContent = 'Сохранить';
  let profileName = document.querySelector('.profile__name').textContent;
  profileNameEdit.value = profileName;
  let profileStatus = document.querySelector('.profile__status').textContent;
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
  let nameInput = document.querySelector('.form-edit__item_field_profile-name').value;
  let statusInput = document.querySelector('.form-edit__item_field_profile-status').value;
  // выберираем элементы, куда буудут вставлены значения полей
  let nameOutput = document.querySelector('.profile__name');
  let statusOutput = document.querySelector('.profile__status');
  // подставляем новые значения с помощью textContent
  nameOutput.textContent = nameInput;
  statusOutput.textContent = statusInput;
  closePopup(popup);
  }
}

// Слушатели событий

// нажатие на кнопку редактирования профиля
profileButtonEdit.addEventListener('click', function() {
  openPopup(popup);
  popupEditPreset();
});

// нажатие на кнопку закрытия редактирования профиля
popupButtonClose.addEventListener('click', function() {
  closePopup(popup);
});

// нажатие на добавление карточки
profileButtonAdd.addEventListener('click', function() {
  openPopup(popup);
  popupAddPreset();
});

formElement.addEventListener('submit', handleFormSubmit);