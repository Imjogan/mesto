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
        formList,
        configGenerationCards,
        configValidation,
        profileButtonAdd,
        profileButtonEdit,
        inputArray
} from '../utils/constants.js';

// ----------------- создание экземпляра секции с карточками -----------------
const cardList = new Section({
  items: cardsReverse,
  renderer: (item) => {
    const card = new Card(item, configGenerationCards, '#card-template', handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, elements);

// отрисовка карточек на странице
cardList.renderItems();
// ---------------------------------------------------------------------------

// --------------- применяем валидацию ко всем формам страницы ---------------
formList.forEach((item) => {
  item.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
	const formValidator = new FormValidator(configValidation, item);
  formValidator.enableValidation();
});
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
      const card = new Card(item, configGenerationCards, '#card-template', handleCardClick);
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    }
  }, elements);
  newCard.renderItems();
});
// ---------------------------------------------------------------------------

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
});
// ---------------------------------------------------------------------------

// ------------- функция для открытия попапа изображения карточки ------------
function handleCardClick(name, link) {
  const PopupZoomImage = new PopupWithImage('.popup_section_image-zoom', name, link);
  PopupZoomImage.open();
}
// ---------------------------------------------------------------------------

// Слушатели 

// слушатель нажатия на кнопку добавления карточки
profileButtonAdd.addEventListener('click', () => {
  popupCardAdd.open();
});

// слушатель нажатия на кнопку редактирования профиля
profileButtonEdit.addEventListener('click', () => {
  popupProfileEdit.open();
  const [inputName, inputStatus] = inputArray;
  const {name, status} = userInfo.getUserInfo();
  [inputName.value, inputStatus.value] = [name, status];
});