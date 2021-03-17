// Импорты
import './index.css'; // импорт главного файла стилей 
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
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

// ------------------------ создание экземпляра секции -----------------------
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, elements);
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
                                profileName: '.profile__name',
                                profileStatus: '.profile__status',
                                profileAvatar: '.profile__avatar'
                              });
// ---------------------------------------------------------------------------

// ---------- создание экземпляра попапа для редактирования профиля ----------
const popupProfileEdit = new PopupWithForm('.popup_section_profile-edit', (inputsValue) => {
  const [name, status] = inputsValue;
  // userInfo.setUserInfo(name, status);


  api.setUserInfo(name, status)
    .then(res => res.json())
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
    })
    .catch(error => {
      console.log(error);
    });


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



// создаем класс для связи с сервером
const api = new Api({
  // базовый адрес обращения
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    // уникальный токен пользователя
    authorization: 'a3ab0050-d01a-4f5a-9bb4-4a039b0aa641',
    // MIME Type - формат отправляемых данных (формат JSON)
    'Content-Type': 'application/json'
  }
}); 

// вызываем метод для взятия данных карточек с сервера и отрисовки их на странице
api.getInitialCards()
  .then(card => {
    cardList.renderItems(card);
  }).catch(error => {
    console.log(error);
  })

api.getUserInfo()
  .then(user => {
    userInfo.setUserInfo(user.name, user.about, user.avatar);
  })