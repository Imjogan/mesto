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
// попал увеличения изображения
const popupImageZoom = root.querySelector('#popupImageZoom');
// закрытие popup-ов
const popupButtonClose = root.querySelector('.popup__button-close');
const popupZoomClose = root.querySelector('.popup__button-close_purpose_zoom');
// попал РПиДК
const popupContainer = root.querySelector('.popup__container');
const popupTitle = root.querySelector('.popup__title');
const formElement = root.querySelector('.form-edit');
const popupButtonSubmit = root.querySelector('.form-edit__button');
let profileNameEdit = root.querySelector('.form-edit__item_field_profile-name');
let profileStatusEdit = root.querySelector('.form-edit__item_field_profile-status');
let profileName = root.querySelector('.profile__name');
let profileStatus = root.querySelector('.profile__status');
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
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardLike = cardElement.querySelector('.element__like');
  const cardTrash = cardElement.querySelector('.element__trash-button');
  // берем изображение и имя из объекта
  cardImage.src = element.link;
  cardTitle.textContent = element.name;
  cardImage.alt = element.name;
  // ставим лайк
  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  // удаляем карточку
  cardTrash.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  // открытие попапа УИК
  cardImage.addEventListener('click', function (evt) {
    popupContainer.classList.add('popup__container_closed');
    popupZoomImage.classList.remove('popup__zoom-image_closed');
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupTitleZoomImage.textContent = evt.target.alt;
    openPopup(popupImageZoom);
  });
  // добавляем на страницу
  console.log(cardElement);
  return cardElement;
  elements.prepend(cardElement);
}



// выводим карточки
initialCards.forEach(renderCards);



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
  profileNameEdit.value = profileName.textContent;
  profileStatusEdit.value = profileStatus.textContent;
}


function handleFormSubmit (evt) {
  if(popupTitle.textContent === 'Новое место') {
    evt.preventDefault(); // отмена обновления окна браузера
    // заносим данные в объект
    const newCard = { 
                      name: profileNameEdit.value,
                      link: profileStatusEdit.value
                    };
    renderCards(newCard);
    closePopup(popup);
  }
  else if(popupTitle.textContent === 'Редактировать профиль') {
    evt.preventDefault(); // отмена обновления окна браузера
    // подставляем новые значения
    profileName.textContent = profileNameEdit.value;
    profileStatus.textContent = profileStatusEdit.value;

    closePopup(popup);
  }
}

// пресет открытия/закрытия popap-а УИК
function openClosePopupImage() {
  popupContainer.classList.remove('popup__container_closed');
  popupZoomImage.classList.add('popup__zoom-image_closed');
}

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