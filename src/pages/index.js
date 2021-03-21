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
        configGenerationCards,
        configValidation
} from '../utils/constants.js';

// Константы
// страница index.html
const root = document.querySelector('.root');

// контейнер для карточек
const elements = root.querySelector('.elements');

// формы страницы
const formProfileEdit = root.querySelector('.form_section_profile-edit');
const formAddCard = root.querySelector('.form_section_card-add');
const formUpdateAvatar = root.querySelector('.form_section_update-avatar');

// --------------------- попап редактирования профиля ---------------------
// селектор кнопки редактирования профиля
const profileButtonEdit = root.querySelector('.profile__button-edit');
// попап
const popupEdit = root.querySelector('.popup_section_profile-edit');
// массив инпутов
const inputArray = Array.from(popupEdit.querySelectorAll('.form__input'));
const buttonSubmitEdit = root.querySelector('.form__button_section_profile-edit');
// ------------------------------------------------------------------------

// ---------------------- попап добавления карточки -----------------------
// селектор кнопки добавления карточки
const profileButtonAdd = root.querySelector('.profile__button-add');
const buttonSubmitAdd = root.querySelector('.form__button_section_card-add');
// ------------------------------------------------------------------------

// -------------------- попап увеличения изображения ----------------------
// селекторы формы для увеличения изображения
const popupImage = root.querySelector('.popup__image');
const popupTitleZoomImage = root.querySelector('.popup__title-zoom-image');
// ------------------------------------------------------------------------

// ---------------------- попап обновления аватара ------------------------
const avatarIcon = root.querySelector('.profile__cover');
const buttonSubmitUpdate = root.querySelector('.form__button_section_update-avatar');
// ------------------------------------------------------------------------

// --------------- применяем валидацию ко всем формам страницы ---------------
const formProfileEditValidator = new FormValidator(configValidation, formProfileEdit);
formProfileEditValidator.enableValidation();

const formAddCardValidator = new FormValidator(configValidation, formAddCard);
formAddCardValidator.enableValidation();

const formUpdateAvatarValidator = new FormValidator(configValidation, formUpdateAvatar);
formUpdateAvatarValidator.enableValidation();
// ---------------------------------------------------------------------------

// ------------------- создание экземпляра класса карточки -------------------
const createCard = (cardData) => {
  const card = new Card({
    // объект с данными карточки
    data: {
      name: cardData.name,
      link: cardData.link,
      cardID: cardData._id,
      owner: cardData.owner,
      likes: cardData.likes
    },
    // произойдет при клике на картинку
    handleCardClick: (name, link) => {
      popupZoomImage.open(name, link);
    },
    // произойдет при клике на лайк
    handleLikeClick: (cardInfo, likes, user, likeButton, likesCounter) => {
      let likesOnCard = likes;
      if(likesOnCard.includes(user._id)) {
        api.deleteLike(cardInfo.cardID)
        .then(res => {
          likeButton.classList.remove('element__like_active');
          likesOnCard.splice(likesOnCard.indexOf(user._id),1);
          likesCounter.textContent = res.likes.length;
        })
        .catch(error => {
          console.log(error);
        })
      } else {
        api.setLike(cardInfo.cardID)
        .then(res => {
          likeButton.classList.add('element__like_active');
          likesOnCard.push(user._id);
          likesCounter.textContent = res.likes.length;
        })
        .catch(error => {
          console.log(error);
        })
      }
    },
    // произойдет при клике на удаление
    handleDeleteIconClick: (cardID) => {
      popupCardDeleteConfirm.open();
      popupCardDeleteConfirm.createHandleSubmit(() => {
        api.deleteCard(cardID)
        .then(res => {
          console.log(res);
          card.removeCardLayout();
          popupCardDeleteConfirm.close();
        })
        .catch(error => {
          console.log(error);
        })
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
// ---------------------------------------------------------------------------

// ------------- создание экземпляра класса информации профиля ---------------
const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileStatus: '.profile__status',
  profileAvatar: '.profile__avatar'
});
// ---------------------------------------------------------------------------

// ------------------------ создание экземпляра секции -----------------------
const cardList = new Section({
  renderer: (cardData) => {
    cardList.addItem(createCard(cardData));
  }
}, elements);
// ---------------------------------------------------------------------------

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

// получаем данные о пользователе и карточках
api.getInitialData()
  .then(data => {
    const [initialCardsData, initialUserData] = data;
    userInfo.setUserInfo(initialUserData);
    cardList.renderItems(initialCardsData.reverse());
  }).catch(error => {
    console.log(error);
  })

// ----------- создание экземпляра попапа для добавления карточки ------------
const popupCardAdd = new PopupWithForm('.popup_section_card-add', (inputsValue) => {
  buttonSubmitAdd.textContent = 'Добавление...';
  const user = {};
  [user.name, user.link] = inputsValue;
// вызываем метод для создания карточки на сервере и отрисовки ее на странице
api.createUserInfo(user.name, user.link)
  .then(card => {
    const array = [];
    array.push(card);
    cardList.renderItems(array);
    popupCardAdd.close();
    buttonSubmitAdd.textContent = 'Добавить';
  })
  .catch(error => {
    console.log(error);
  });
});
// ---------------------------------------------------------------------------

// ---------- создание экземпляра попапа для редактирования профиля ----------
const popupProfileEdit = new PopupWithForm('.popup_section_profile-edit', (inputsValue) => {
  buttonSubmitEdit.textContent = 'Сохранение...';
  const [name, status] = inputsValue;
  api.setUserInfo(name, status)
    .then(res => {
      userInfo.setUserInfo(res);
      popupProfileEdit.close();
      buttonSubmitEdit.textContent = 'Сохранить';
    })
    .catch(error => {
      console.log(error);
    });
});
// ---------------------------------------------------------------------------

// ------------ создание экземпляра попапа для обновления аватара ------------
const popupAvatarUpdate = new PopupWithForm('.popup_section_update-avatar', (inputValue) => {
  buttonSubmitUpdate.textContent = 'Сохранение...';
  const [avatarUrl] = inputValue;
  api.updateAvatar(avatarUrl)
    .then(res => {
      userInfo.setUserInfo(res);
      popupAvatarUpdate.close();
      buttonSubmitUpdate.textContent = 'Сохранить';
    })
    .catch(error => {
      console.log(error);
    });
});
// ---------------------------------------------------------------------------

// ------------ создание экземпляра попапа для открытия карточки -------------
const popupZoomImage = new PopupWithImage('.popup_section_image-zoom', popupImage, popupTitleZoomImage);
// ---------------------------------------------------------------------------

// --------- создание экземпляра попапа для подтверждения удаления ---------
const popupCardDeleteConfirm = new PopupWithSubmit('.popup_section_delete-confirm');
// ---------------------------------------------------------------------------

// Слушатели

// навесили слушатели на попапы
popupZoomImage.setEventListeners();
popupAvatarUpdate.setEventListeners();
popupCardAdd.setEventListeners();
popupProfileEdit.setEventListeners();
popupCardDeleteConfirm.setEventListeners();

// слушатель нажатия на кнопку добавления карточки
profileButtonAdd.addEventListener('click', () => {
  // сбросили ошибки и заблокировали кнопку
  formAddCardValidator.resetFormErrors();
  popupCardAdd.open();
});

// слушатель нажатия на иконку аватара
avatarIcon.addEventListener('click', () => {
  // сбросили ошибки и заблокировали кнопку
  formUpdateAvatarValidator.resetFormErrors();
  popupAvatarUpdate.open();
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
