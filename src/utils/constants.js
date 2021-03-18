const root = document.querySelector('.root');

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

// перевернутый массив
export const cardsReverse = initialCards.reverse();

// объект с селекторами для валидации форм
export const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
  fieldsSelector: '.form__fields'
};

// объект с селекторами для шаблона карточек
export const configGenerationCards = {
  cardElement: '.element',
  cardImage: '.element__image',
  cardTitle: '.element__title',
  cardLike: '.element__like',
  cardTrash: '.element__trash-button'
};

// контейнер для карточек
export const elements = root.querySelector('.elements');

// формы страницы
export const formProfileEdit = root.querySelector('.form_section_profile-edit');
export const formAddCard = root.querySelector('.form_section_card-add');

// --------------------- попап редактирования профиля ---------------------
// селектор кнопки редактирования профиля
export const profileButtonEdit = root.querySelector('.profile__button-edit');
// попап
const popupEdit = root.querySelector('.popup_section_profile-edit');
// массив инпутов
export const inputArray = Array.from(popupEdit.querySelectorAll('.form__input'));
// ------------------------------------------------------------------------

// ---------------------- попап добавления карточки -----------------------
// селектор кнопки добавления карточки
export const profileButtonAdd = root.querySelector('.profile__button-add');
export const buttonSubmitAdd = root.querySelector('.form__button_section_card-add');
// ------------------------------------------------------------------------

// -------------------- попап увеличения изображения ----------------------
// селекторы формы для увеличения изображения
export const popupImage = root.querySelector('.popup__image');
export const popupTitleZoomImage = root.querySelector('.popup__title-zoom-image');
// ------------------------------------------------------------------------