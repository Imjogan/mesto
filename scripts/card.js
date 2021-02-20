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
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}

cardsReverse.forEach((item) => {
	const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();

	document.querySelector('.elements').append(cardElement);
});