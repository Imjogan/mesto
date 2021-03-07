// Импорты
import './index.css'; // импорт главного файла стилей 
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
        cardsReverse,
        elements,
        formProfileEdit,
        formAddCard,
        configGenerationCards,
        configValidation,
        profileButtonAdd,
        profileButtonEdit,
        inputArray,
        popupImage,
        popupTitleZoomImage
} from '../utils/constants.js';

// ------------------- создание экземпляра класса карточки -------------------
const createCard = (item) => {
  const card = new Card(item, configGenerationCards, '#card-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};
// ---------------------------------------------------------------------------

// ----------------- создание экземпляра секции с карточками -----------------
const cardList = new Section({
  items: cardsReverse,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, elements);

// отрисовка карточек на странице
cardList.renderItems();
// ---------------------------------------------------------------------------

// --------------- применяем валидацию ко всем формам страницы ---------------
const formProfileEditValidator = new FormValidator(configValidation, formProfileEdit);
formProfileEditValidator.enableValidation();

const formAddCardValidator = new FormValidator(configValidation, formAddCard);
formAddCardValidator.enableValidation();
// ---------------------------------------------------------------------------

// ----------- создание экземпляра попапа для добавления карточки ------------
const popupCardAdd = new PopupWithForm('.popup_section_card-add', (inputsValue) => {
  const user = [];
  [user.name, user.link] = inputsValue;
  const obj = [];
  obj.push(user);
  const newCard = new Section({
    items: obj,
    renderer: (item) => {
      newCard.addItem(createCard(item));
    }
  }, elements);
  newCard.renderItems();
  popupCardAdd.close();
});
// ---------------------------------------------------------------------------
// навесили слушатели на попап
popupCardAdd.setEventListeners();

// ------------- создание экземпляра класса информации профиля ---------------
const userInfo = new UserInfo({
                                elementProfileName: '.profile__name',
                                elementProfileStatus: '.profile__status'
                              });
// ---------------------------------------------------------------------------

// ---------- создание экземпляра попапа для редактирования профиля ----------
const popupProfileEdit = new PopupWithForm('.popup_section_profile-edit', (inputsValue) => {
  const [name, status] = inputsValue;
  userInfo.setUserInfo(name, status);
  popupProfileEdit.close();
});
// ---------------------------------------------------------------------------
// навесили слушатели на попап
popupProfileEdit.setEventListeners();

// ------------ создание экземпляра попапа для открытия карточки -------------
const PopupZoomImage = new PopupWithImage('.popup_section_image-zoom', popupImage, popupTitleZoomImage);
// ---------------------------------------------------------------------------
// навесили слушатели на попап
PopupZoomImage.setEventListeners();

// ------------- функция для открытия попапа изображения карточки ------------
function handleCardClick(name, link) {
  PopupZoomImage.open(name, link);
}
// ---------------------------------------------------------------------------

// Слушатели 

// слушатель нажатия на кнопку добавления карточки
profileButtonAdd.addEventListener('click', () => {
  // сбросили ошибки и заблокировали кнопку
  formAddCardValidator.resetFormErrors();
  popupCardAdd.open();
});

// слушатель нажатия на кнопку редактирования профиля
profileButtonEdit.addEventListener('click', () => {
  // сбросили ошибки и заблокировали кнопку
  formProfileEditValidator.resetFormErrors();
  popupProfileEdit.open();
  const [inputName, inputStatus] = inputArray;
  const {name, status} = userInfo.getUserInfo();
  [inputName.value, inputStatus.value] = [name, status];
});

// слушатели для отмены стандартной отправки форм
formProfileEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
});