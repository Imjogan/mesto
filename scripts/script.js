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

// перевернем массив
const cardsReverse = initialCards.reverse();
// селекторы страницы
const root = document.querySelector('.root');
const elements = root.querySelector('.elements');
// нашли template карточек на странице
const cardTemplate = root.querySelector('#card-template').content;
// создали массив popup-ов
const popupList = Array.from(document.querySelectorAll('.popup'));

// --------------------- попап редактирования профиля ---------------------
// селектор кнопки редактирования профиля
const profileButtonEdit = root.querySelector('.profile__button-edit');
// сам попап
const popupProfileEdit = root.querySelector('.popup_section_profile-edit');
// закрытие попапа
const buttonClosePopupProfileEdit = root.querySelector('.popup__button-close_section_profile-edit');
// форма попапа
const formElementPopupProfileEdit = root.querySelector('.form_section_profile-edit');
// селекторы формы и страницы для редактирования
const profileName = root.querySelector('.profile__name');
const profileStatus = root.querySelector('.profile__status');
const firstFieldFormEdit = root.querySelector('.form__input_field_profile-name');
const secondFieldFormEdit = root.querySelector('.form__input_field_profile-status');
// ------------------------------------------------------------------------

// ---------------------- попап добавления карточки -----------------------
// селектор кнопки добавления карточки
const profileButtonAdd = root.querySelector('.profile__button-add');
// сам попап
const popupCardAdd = root.querySelector('.popup_section_card-add');
// закрытие попапа
const buttonClosePopupCardAdd = root.querySelector('.popup__button-close_section_card-add');
// форма попапа
const formElementPopupCardAdd = root.querySelector('.form_section_card-add');
// селекторы формы для добавления 
const firstFieldFormAdd = root.querySelector('.form__input_field_card-name');
const secondFieldFormAdd = root.querySelector('.form__input_field_card-link');
// кнопка submit
const buttonFormAddCardSubmit = root.querySelector('.form__button_section_card-add');
// ------------------------------------------------------------------------

// -------------------- попап увеличения изображения ----------------------
// сам попап
const popupImageZoom = root.querySelector('.popup_section_image-zoom');
// закрытие попапа
const buttonClosePopupImageZoom = root.querySelector('.popup__button-close_section_image-zoom');
// селекторы формы для увеличения изображения
const popupImage = root.querySelector('.popup__image');
const popupTitleZoomImage = root.querySelector('.popup__title-zoom-image');
// ------------------------------------------------------------------------
const formCardAddInputs = Array.from(formElementPopupCardAdd.querySelectorAll(configValidation.inputSelector));


// Функции

// создаем карточку и возвращаем ее
const createCard = element => {
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
  setCardLikeListener(cardLike);
  // удаляем карточку
  setCardRemoveListener(cardTrash);
  // открытие попапа УИК
  setCardZoomListener(cardImage);
  // возвращаем карточку
  return cardElement;
}

// функция постановки лайка
const setCardLikeListener = cardLike => {
  cardLike.addEventListener('click', evt => {
    evt.target.classList.toggle('element__like_active');
  });
};

// функция удаления карточки
const setCardRemoveListener = cardTrash => {
  cardTrash.addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });
};

// функция увеличения изображения
const setCardZoomListener = cardImage => {
  cardImage.addEventListener('click', evt => {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupTitleZoomImage.textContent = evt.target.alt;
    openPopup(popupImageZoom);
  });
};

// функция добавления на страницу
const renderCard = cardElement => {
  elements.prepend(createCard(cardElement));
}

// выводим карточки
cardsReverse.forEach(renderCard);

// закрытие на оверлей
const closePopupOverlay = () => {
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', function (evt) {
      if (evt.target === popupElement) {
        closePopup(popupElement);
      }
    });
  });
};

// вызываем функцию для закрытия на overlay
closePopupOverlay();

// закрытие попапа на Escape
const closePopupEscape = evt => {
  if(evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// функция открытия popup-а
const openPopup = popupElement => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
} 

// функция закрытия popup-а
const closePopup = popupElement => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

// функция отправки формы добавления карточки
const handleAddFormSubmit = evt => {
  evt.preventDefault(); // отмена обновления окна браузера
  // заносим данные в объект
  const newCard = {
                    name: firstFieldFormAdd.value,
                    link: secondFieldFormAdd.value
                  };
  // добавляем на страницу
  renderCard(newCard);
  closePopup(popupCardAdd);
}

// функция отправки формы редактирования профиля
const handleEditFormSubmit = evt => {
  evt.preventDefault(); // отмена обновления окна браузера
  // подставляем новые значения
  profileName.textContent = firstFieldFormEdit.value;
  profileStatus.textContent = secondFieldFormEdit.value;
  closePopup(popupProfileEdit);
}

// пресет окна редактирования профиля
const presetPopupProfileEdit = () => {
  firstFieldFormEdit.value = profileName.textContent;
  secondFieldFormEdit.value = profileStatus.textContent;
};

// Слушатели событий

// -------------------- для редактирования профиля ----------------------
// нажатие на кнопку редактирования профиля
profileButtonEdit.addEventListener('click', function() {
  presetPopupProfileEdit();
  resetFormErrors(formElementPopupProfileEdit);
  openPopup(popupProfileEdit);
});

// нажатие на кнопку закрытия попапа
buttonClosePopupProfileEdit.addEventListener('click', function() {
  closePopup(popupProfileEdit);
});

// отправка формы
formElementPopupProfileEdit.addEventListener('submit', handleEditFormSubmit);
// ----------------------------------------------------------------------

// --------------------- для добавления карточки ------------------------
// нажатие на кнопку добавление карточки
profileButtonAdd.addEventListener('click', function() {
  formElementPopupCardAdd.reset();
  resetFormErrors(formElementPopupCardAdd);
  openPopup(popupCardAdd);
  toggleButtonState(formCardAddInputs, buttonFormAddCardSubmit);
});

// нажатие на кнопку закрытия попапа
buttonClosePopupCardAdd.addEventListener('click', function() {
  closePopup(popupCardAdd);
});

// отправка формы
formElementPopupCardAdd.addEventListener('submit', handleAddFormSubmit);
// ----------------------------------------------------------------------

// --------------- для увеличения изображения карточки ------------------
// нажатие на кнопку закрытия попапа
buttonClosePopupImageZoom.addEventListener('click', function() {
  closePopup(popupImageZoom);
});
// ----------------------------------------------------------------------