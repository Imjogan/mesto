// Создаем класс карточки и применяем экспорт по-умолчанию
export default class Card {
  // в конструктор принимаем объект с содержимым карточек,
  // объект с селекторами шаблона, селектор template и функция открытия попапа с картинкой
	constructor({data, handleCardClick, handleLikeClick, handleDeleteIconClick},
    cardSelector, config, user) {
    this._user = user;
    // callback-и
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    // карточка
		this._cardName = data.name;
		this._cardLink = data.link;
    this._cardId = data.cardID;
    this._cardOwner = data.owner;
    this._cardLikes = data.likes;
    this._cardInfo = data;
    // шаблон
    this._cardElement = config.cardElement;
    this._cardImage = config.cardImage;
    this._cardTitle = config.cardTitle;
    this._cardLike = config.cardLike;
    this._cardTrash = config.cardTrash;
    this._cardLikeCounter = config.cardLikeCounter;
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
    this._cardPicture = this._element.querySelector(this._cardImage);
    const deleteButton = this._element.querySelector(this._cardTrash);
    const likeButton = this._element.querySelector(this._cardLike);
    const likeCounter = this._element.querySelector(this._cardLikeCounter);
    //  наполняем карточку содержимым из объекта
    this._cardPicture.src = this._cardLink;
    this._cardPicture.alt = this._cardName;
    this._element.querySelector(this._cardTitle).textContent = this._cardName;
    likeCounter.textContent = this._cardLikes.length;

    
    // навешиваем обработчики
    // слушатель лайка
    likeButton.addEventListener('click', () => {
      // console.log(this._cardLikes)
      // console.log(this._user)
      if(!this._cardLikes.includes(this._user)) {
        // console.log('лайк уже стоит')
      }
      this._handleLikeClick(this._cardInfo);
      likeCounter.textContent = this._cardLikes.length + 1;
      this._element.querySelector(this._cardLike).classList.toggle('element__like_active');
    });

    // слушатель удаления
    if(this._cardOwner._id === this._user._id) {
      deleteButton.addEventListener('click', () => {
        this._handleDeleteIconClick(this._cardId);
      });
    } else {
      deleteButton.remove();
    }

    // слушатель нажатия на изображение
    this._handleCardZoomListener();
    
    // возвращаем готовую карточку
    return this._element;
  }

  // приватный метод, удаление карточки
  removeCardLayout() {
    this._element.closest(this._cardElement).remove();
  }

  // приватный метод, слушатель нажатия на изображение
  _handleCardZoomListener() {
    this._cardPicture.addEventListener('click', () => {
      this._handleCardClick(this._cardName, this._cardLink);
    });
  }
}