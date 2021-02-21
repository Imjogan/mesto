import { popupImage, popupTitleZoomImage, openPopup, popupImageZoom } from './script.js';

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

export default class Card {
	constructor(data, cardSelector) {
		this._name = data.name;
		this._link = data.link;
		this._cardSelector = cardSelector;
	}

	_getTemplate() {
    const cardElement = document.querySelector(this._cardSelector)
    .content.querySelector('.element').cloneNode(true);

    return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._handleCardLikeListener();
    this._handleCardRemoveListener();
    this._handleCardZoomListener();

    return this._element;
  }

  // лайк
  _handleCardLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleCardLikeListener() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleCardLikeClick();
    });
  }

  // удаление карточки
  _handleCardRemoveClick() {
    this._element.closest('.element').remove();
  }

  _handleCardRemoveListener() {
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._handleCardRemoveClick();
    });
  }

  // зум карточки
  _handleCardZoomClick() {
    popupImage.src = this._element.querySelector('.element__image').src;
    popupImage.alt = this._element.querySelector('.element__image').alt;
    popupTitleZoomImage.textContent = this._element.querySelector('.element__image').alt;
    openPopup(popupImageZoom);
  }

  _handleCardZoomListener() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardZoomClick();
    });
  }
}

cardsReverse.forEach((item) => {
	const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();

	document.querySelector('.elements').append(cardElement);
});