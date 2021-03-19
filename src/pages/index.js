// Импорты
import './index.css'; // импорт главного файла стилей 
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import {
        elements,
        formProfileEdit,
        formAddCard,
        configGenerationCards,
        configValidation,
        profileButtonAdd,
        profileButtonEdit,
        inputArray,
        popupImage,
        popupTitleZoomImage,
        buttonSubmitAdd
} from '../utils/constants.js';

// ------------------- создание экземпляра класса карточки -------------------
// const createCard = (item) => {
//   const card = new Card(item, configGenerationCards, '#card-template', handleCardClick);
//   const cardElement = card.generateCard();
//   return cardElement;
// };
// ---------------------------------------------------------------------------


const createCard = (cardData) => {
  const card = new Card({
    data: {
      name: cardData.name,
      link: cardData.link,
      cardID: cardData._id,
      owner: cardData.owner,
      likes: cardData.likes
    },
    handleCardClick: (name, link) => {
      // ...что должно произойти при клике на картинку
      PopupZoomImage.open(name, link);
    },
    handleLikeClick: (cardInfo) => {
      // ...что должно произойти при клике на лайк
      api.setLike(cardInfo.cardID)
      .then(res => {
        console.log(res.likes);
        console.log(userInfo.getUser())
          if(res.likes.includes(userInfo.getUser())) {

          }
        
        console.log('ура');
      })
    },
    handleDeleteIconClick: (cardID) => {
      // ...что должно произойти при клике на удаление
      popupCardDeleteConfirm.open();
      popupCardDeleteConfirm.method(() => {
        api.deleteCard(cardID)
        .then(res => {
          console.log(res);
        })
      card.removeCardLayout();
      popupCardDeleteConfirm.close();
      });
    }
    },
    '#card-template',
    configGenerationCards,
    userInfo.getUser()
  );
  const cardElement = card.generateCard();
  return cardElement;
};



// ------------------------ создание экземпляра секции -----------------------
const cardList = new Section({
  renderer: (cardData) => {
    cardList.addItem(createCard(cardData));
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
  const user = {};
  [user.name, user.link] = inputsValue;
  buttonSubmitAdd.textContent = 'Добавление...';
// вызываем метод для создания карточки на сервере и отрисовки ее на странице
api.createUserInfo(user.name, user.link)
  .then(card => {
    const array = [];
    array.push(card);
    cardList.renderItems(array);
    buttonSubmitAdd.textContent = 'Добавлено';
  }).catch(error => {
    console.log(error);
  });
  popupCardAdd.close();
  buttonSubmitAdd.textContent = 'Добавить';
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
  api.setUserInfo(name, status)
    .then(res => {
      userInfo.setUserInfo(res);
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
// function handleCardClick(name, link) {
//   PopupZoomImage.open(name, link);
// }
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
    console.log(card);
    cardList.renderItems(card.reverse());
  }).catch(error => {
    console.log(error);
  })

// получаем данные о пользователе 
api.getUserInfo()
  .then(user => {
    userInfo.setUserInfo(user);
  })


// --------- создание экземпляра попапа для подтверждения удаления ---------
const popupCardDeleteConfirm = new PopupWithSubmit('.popup_section_delete-confirm');
// ---------------------------------------------------------------------------  
popupCardDeleteConfirm.setEventListeners();