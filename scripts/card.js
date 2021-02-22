// Импорты
import { popupImage, popupTitleZoomImage, openPopup, popupImageZoom } from './script.js';

// Создаем класс карточки и применяем экспорт по-умолчанию
export default class Card {
  // в конструктор принимаем объект с содержимым карточек, объект с селекторами шаблона и селектор template
	constructor(data, config, cardSelector) {
    // карточка
		this._name = data.name;
		this._link = data.link;
    // шаблон
    this._cardElement = config.cardElement;
    this._cardImage = config.cardImage;
    this._cardTitle = config.cardTitle;
    this._cardLike = config.cardLike;
    this._cardTrash = config.cardTrash;
    // селектор шаблона
		this._cardSelector = cardSelector;
	}

  // приватный метод, помещаем в переменную клон шаблона и возвращаем ее
	_getTemplate() {
    const cardElement = document.querySelector(this._cardSelector)
    .content.querySelector(this._cardElement).cloneNode(true);

    return cardElement;
  }
  
  // публичный метод, создает карточку и навешивает обработчики
  generateCard() {
    // поместили в переменную содержимое приватного метода
    this._element = this._getTemplate();
    //  наполняем карточку содержимым из объекта
    this._element.querySelector(this._cardImage).src = this._link;
    this._element.querySelector(this._cardImage).alt = this._name;
    this._element.querySelector(this._cardTitle).textContent = this._name;
    // навешиваем обработчики
    // слушатель лайка
    this._handleCardLikeListener();
    // слушатель удаления
    this._handleCardRemoveListener();
    // слушатель увеличения
    this._handleCardZoomListener();

    // возвращаем готовую карточку
    return this._element;
  }

  // приватный метод, лайк
  _handleCardLikeClick() {
    this._element.querySelector(this._cardLike).classList.toggle('element__like_active');
  }
  // приватный метод, слушатель нажатия на лайк
  _handleCardLikeListener() {
    this._element.querySelector(this._cardLike).addEventListener('click', () => {
      this._handleCardLikeClick();
    });
  }

  // приватный метод, удаление карточки
  _handleCardRemoveClick() {
    this._element.closest(this._cardElement).remove();
  }
  // приватный метод, слушатель нажатия на корзину
  _handleCardRemoveListener() {
    this._element.querySelector(this._cardTrash).addEventListener('click', () => {
      this._handleCardRemoveClick();
    });
  }

  // приватный метод, зум карточки
  _handleCardZoomClick() {
    popupImage.src = this._element.querySelector(this._cardImage).src;
    popupImage.alt = this._element.querySelector(this._cardImage).alt;
    popupTitleZoomImage.textContent = this._element.querySelector(this._cardImage).alt;
    openPopup(popupImageZoom);
  }
  // приватный метод, слушатель нажатия картинку карточки
  _handleCardZoomListener() {
    this._element.querySelector(this._cardImage).addEventListener('click', () => {
      this._handleCardZoomClick();
    });
  }
}