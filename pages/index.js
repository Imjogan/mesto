// Импорты
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

// Экспорты
export { popupImage, popupTitleZoomImage, openPopup,
         popupImageZoom, profileButtonEdit, profileButtonAdd };

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

// объект с селекторами для валидации форм
const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
  fieldsSelector: '.form__fields'
};

// объект с селекторами для шаблона карточек
const configGenerationCards = {
  cardElement: '.element',
  cardImage: '.element__image',
  cardTitle: '.element__title',
  cardLike: '.element__like',
  cardTrash: '.element__trash-button'
};

// перевернем массив
const cardsReverse = initialCards.reverse();
// селекторы страницы
const root = document.querySelector('.root');
const elements = root.querySelector('.elements');

// --------------------- попап редактирования профиля ---------------------
// селектор кнопки редактирования профиля
const profileButtonEdit = root.querySelector('.profile__button-edit');
// сам попап
// const popupProfileEdit = root.querySelector('.popup_section_profile-edit');
// закрытие попапа
const buttonClosePopupProfileEdit = root.querySelector('.popup__button-close_section_profile-edit');
// форма попапа
const formElementPopupProfileEdit = root.querySelector('.form_section_profile-edit');
// селекторы формы и страницы для редактирования
export const profileName = root.querySelector('.profile__name');
export const profileStatus = root.querySelector('.profile__status');
export const firstFieldFormEdit = root.querySelector('.form__input_field_profile-name');
export const secondFieldFormEdit = root.querySelector('.form__input_field_profile-status');
// ------------------------------------------------------------------------

// ---------------------- попап добавления карточки -----------------------
// селектор кнопки добавления карточки
const profileButtonAdd = root.querySelector('.profile__button-add');
// сам попап
// const popupCardAdd = root.querySelector('.popup_section_card-add');
// закрытие попапа
const buttonClosePopupCardAdd = root.querySelector('.popup__button-close_section_card-add');
// форма попапа
const formElementPopupCardAdd = root.querySelector('.form_section_card-add');
// селекторы формы для добавления 
const firstFieldFormAdd = root.querySelector('.form__input_field_card-name');
const secondFieldFormAdd = root.querySelector('.form__input_field_card-link');
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

// Функции

// создание экземпляра секции с карточками
const cardList = new Section({
  items: cardsReverse,
  renderer: (item) => {
    const card = new Card(item, configGenerationCards, '#card-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, elements);

// отрисовка карточек на странице
cardList.renderItems();

// применяем валидацию ко всем формам страницы
// нашли формы
const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
// к каждой применили валидацию
formList.forEach((item) => {
  item.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
	const formValidator = new FormValidator(configValidation, item);
  formValidator.enableValidation();
});

// создание экземпляра попапа для добавления карточки
const popupCardAdd = new PopupWithForm('.popup_section_card-add', (inputsValue) => {
  const user = [];
  [user.name, user.link] = inputsValue;
  const obj = [];
  obj.push(user);
  const newCard = new Section({
    items: obj,
    renderer: (item) => {
      const card = new Card(item, configGenerationCards, '#card-template');
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    }
  }, elements);
  newCard.renderItems();
});

// повесили слушатели событий на попап добавления карточки
popupCardAdd.setEventListeners();

// слушатель нажатия на кнопку добавления карточки
profileButtonAdd.addEventListener('click', () => {
  popupCardAdd.open();
});




// создание экземпляра попапа для редактирования профиля
const popupProfileEdit = new PopupWithForm('.popup_section_profile-edit', (inputsValue) => {
  const [name, status] = inputsValue;
  userInfo.setUserInfo(name, status);
});

// повесили слушатели событий на попап редактирования профиля
popupProfileEdit.setEventListeners();

// слушатель нажатия на кнопку редактирования профиля
profileButtonEdit.addEventListener('click', () => {
  popupProfileEdit.open();
  userInfo.getUserInfo();
});








const userInfo = new UserInfo({ elementProfileName: '.profile__name',
                                elementProfileStatus: '.profile__status'});



console.log(userInfo.getUserInfo());




// функция отправки формы добавления карточки
const handleAddFormSubmit = evt => {
  evt.preventDefault(); // отмена обновления окна браузера
  // заносим данные в объект
  const newCard = {
                    name: firstFieldFormAdd.value,
                    link: secondFieldFormAdd.value
                  };
  // добавляем на страницу
  createCard(newCard);
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
// profileButtonEdit.addEventListener('click', () => {
//   presetPopupProfileEdit();
//   openPopup(popupProfileEdit);
// });

// // нажатие на кнопку закрытия попапа
// buttonClosePopupProfileEdit.addEventListener('click', function() {
//   closePopup(popupProfileEdit);
// });

// // отправка формы
// formElementPopupProfileEdit.addEventListener('submit', handleEditFormSubmit);
// ----------------------------------------------------------------------

// --------------------- для добавления карточки ------------------------
// // нажатие на кнопку добавление карточки
// profileButtonAdd.addEventListener('click', () => {
//   formElementPopupCardAdd.reset();
//   openPopup(popupCardAdd);
// })
 
// // нажатие на кнопку закрытия попапа
// buttonClosePopupCardAdd.addEventListener('click', function() {
//   closePopup(popupCardAdd);
// });

// отправка формы
// formElementPopupCardAdd.addEventListener('submit', handleAddFormSubmit);
// ----------------------------------------------------------------------

// // --------------- для увеличения изображения карточки ------------------
// // нажатие на кнопку закрытия попапа
// buttonClosePopupImageZoom.addEventListener('click', function() {
//   closePopup(popupImageZoom);
// });
// // ----------------------------------------------------------------------








const openPopup = () => {
}




// // закрытие попапа на Escape
// const closePopupEscape = evt => {
//   if(evt.key === "Escape") {
//     closePopup(document.querySelector('.popup_opened'));
//   }
// }

// // функция открытия popup-а
// const openPopup = popupElement => {
//   popupElement.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupEscape);
// } 

// // функция закрытия popup-а
// const closePopup = popupElement => {
//   popupElement.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupEscape);
// }

// // закрытие на оверлей
// const closePopupOverlay = () => {
//   popupList.forEach((popupElement) => {
//     popupElement.addEventListener('click', function (evt) {
//       if (evt.target === popupElement) {
//         closePopup(popupElement);
//       }
//     });
//   });
// };

// // вызываем функцию для закрытия на overlay
// closePopupOverlay();