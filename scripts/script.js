// Переменные

// создаем объект с карточками
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
// находим селекторы на странице
const root = document.querySelector('.root');
const elements = root.querySelector('.elements');
// селектор кнопки редактирования профиля - для открытие popup-а РПиДК
const profileButtonEdit = root.querySelector('.profile__button-edit');
// селектор кнопки добавления карточки - для открытие popup-а УИК
const profileButtonAdd = root.querySelector('.profile__button-add');
// попап
const popup = root.querySelector('.popup');
// закрытие popup-ов
const popupButtonClose = root.querySelector('.popup__button-close');
const popupZoomClose = root.querySelector('.popup__button-close_purpose_zoom');
// попал РПиДК
const popupContainer = root.querySelector('.popup__container');
const popupTitle = root.querySelector('.popup__title');
const formElement = root.querySelector('.form-edit');
const popupButtonSubmit = root.querySelector('.form-edit__button');
const profileNameEdit = root.querySelector('.form-edit__item_field_profile-name');
const profileStatusEdit = root.querySelector('.form-edit__item_field_profile-status');
// попал УИК
const popupZoomImage = root.querySelector('.popup__zoom-image');
const popupImage = root.querySelector('.popup__image');
const popupTitleZoomImage = root.querySelector('.popup__title-zoom-image');
// нашли template карточек на странице
const cardTemplate = root.querySelector('#card-template').content;

// Функции

const renderCards = element => {
  // делаем копию содержимого template-а карточек
  const cardElement = cardTemplate.cloneNode(true);
  // берем изображение и имя из объекта
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__image').alt = element.name;
  // ставим лайк
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like_active');
});
// удаляем карточку
cardElement.querySelector('.element__trash-button').addEventListener('click', function (evt) {
  evt.target.closest('.element').remove();
});
// открытие попапа УИК
cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
  popupContainer.classList.add('popup__container_closed');
  popupZoomImage.classList.remove('popup__zoom-image_closed');
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupTitleZoomImage.textContent = evt.target.alt;
  openPopup(popup);
});
  // добавляем на страницу
  elements.prepend(cardElement);
}

// функция открытия popup-а
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
} 

// функция закрытия popup-а
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// пресет добавления карточки
function addPopupPreset() {
  formElement.reset();
  profileNameEdit.setAttribute('placeholder', 'Название');
  profileStatusEdit.setAttribute('placeholder', 'Ссылка на картинку');
  popupTitle.textContent = 'Новое место';
  popupButtonSubmit.textContent = 'Создать';
}

// пресет редактирования профиля
function editPopupPreset() {
  popupTitle.textContent = 'Редактировать профиль';
  popupButtonSubmit.textContent = 'Сохранить';
  profileNameEdit.removeAttribute('placeholder');
  profileStatusEdit.removeAttribute('placeholder');
  const profileName = root.querySelector('.profile__name').textContent;
  profileNameEdit.value = profileName;
  const profileStatus = root.querySelector('.profile__status').textContent;
  profileStatusEdit.value = profileStatus;
}

function handleFormSubmit (evt) {
  if(popupTitle.textContent === 'Новое место') {
    evt.preventDefault(); // отмена обновления окна браузера
    // находим поля формы в DOM и получаем значения полей из свойств value
    const newCardName = root.querySelector('.form-edit__item_field_profile-name').value;
    const newCardLink = root.querySelector('.form-edit__item_field_profile-status').value;
    // заносим данные в объект
    const newCard = {name: newCardName, link: newCardLink};
    renderCards(newCard);
    closePopup(popup);
  }
  else if(popupTitle.textContent === 'Редактировать профиль') {
    evt.preventDefault(); // отмена обновления окна браузера
    // находим поля формы в DOM и получаем значения полей из свойств value
    const nameInput = root.querySelector('.form-edit__item_field_profile-name').value;
    const statusInput = root.querySelector('.form-edit__item_field_profile-status').value;
    // выберираем элементы, куда будут вставлены значения полей
    const nameOutput = root.querySelector('.profile__name');
    const statusOutput = root.querySelector('.profile__status');
    // подставляем новые значения
    nameOutput.textContent = nameInput;
    statusOutput.textContent = statusInput;
    closePopup(popup);
  }
}

// пресет открытия/закрытия popap-а УИК
function openClosePopupImage() {
  popupContainer.classList.remove('popup__container_closed');
  popupZoomImage.classList.add('popup__zoom-image_closed');
}

// выводим карточки
initialCards.forEach(renderCards);

// Слушатели событий

// нажатие на кнопку редактирования профиля
profileButtonEdit.addEventListener('click', function() {
  openClosePopupImage();
  openPopup(popup);
  editPopupPreset();
});

// нажатие на кнопку закрытия попапа РПиДК
popupButtonClose.addEventListener('click', function() {
  closePopup(popup);
});

// нажатие на кнопку закрытия попапа УИК
popupZoomClose.addEventListener('click', function() {
  closePopup(popup);
});

// нажатие на добавление карточки
profileButtonAdd.addEventListener('click', function() {
  openClosePopupImage();
  openPopup(popup);
  addPopupPreset();
});

// отправка формы
formElement.addEventListener('submit', handleFormSubmit);