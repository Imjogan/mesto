// Создаем класс карточки и применяем экспорт по-умолчанию
export default class FormValidator {
  // в конструктор принимаем объект с селекторами формы и текущая форма
	constructor(data, formElement) {
    // селекторы формы
		this._formSelector = data.formSelector;
		this._inputSelector = data.inputSelector;
	  this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._fieldsSelector = data.fieldsSelector;
    // текущая форма
    this._formElement = formElement;

    this._buttonSubmitForm = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._fieldsetList = Array.from(this._formElement.querySelectorAll(this._fieldsSelector));
	}

  // функция отобржения ошибки (поле ввода, сообщение ошибки)
  _showInputError = (inputElement, errorMessage) => {
    // находим у данной формы селектор сообщения ошибки, принадлежащий полю ввода
    // и заносим данные в константу
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // добавляем полю ввода селектор ошибки (красная граница)
    inputElement.classList.add(this._inputErrorClass);
    // заносим в тест ошибки входное сообщение ошибки
    errorElement.textContent = errorMessage;
    // делаем текст ошибки видимым
    errorElement.classList.add(this._errorClass);
  };

  // функция скрытия ошибки (поле ввода)
  _hideInputError = (inputElement) => {
    // находим у данной формы селектор сообщения ошибки, принадлежащий полю ввода
    // и заносим данные в константу
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // удаляем селектор ошибки поля ввода (красная граница)
    inputElement.classList.remove(this._inputErrorClass);
    // скрываем текст ошибки
    errorElement.classList.remove(this._errorClass);
    // очищаем текст ошибки
    errorElement.textContent = '';
  };

  // функция проверки поля на валидность (поле ввода)
  _checkInputValidity = (inputElement) => {
    // если поле не проходит валидацию - покажем ошибки
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      // иначе - скроем ее
    } else {
      this._hideInputError(inputElement);
    }
  };

  // функция добавления слушателей к полям (форма)
  _setEventListeners = () => {
    // вызываем функцию переключения состояния кнопки sabmit (поля формы, кнопка sabmit формы)
    this._toggleButtonState();
    // проходимся по массиву и к каждому полю ввода применяем функцию
    this._inputList.forEach((inputElement) => {
      // добавляем слушатель события на ввод в поле 
      inputElement.addEventListener('input', () => {
        // вызываем функцию проверки валидности поля
        this._checkInputValidity(inputElement);
        // и функцию переключения состояния кнопки sabmit
        this._toggleButtonState();
      });
    });
  };

  // функция, ответственная за включение валидации форм
  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      // запрещаем браузеру обновлять страницу
      evt.preventDefault();
    });
    // к каждому полю применяем функцию
    this._fieldsetList.forEach((fieldSet) => {
      // вызываем функцию добавления слушателей
      this._setEventListeners(fieldSet);
    });
  };

  // функция проверки поля на валидность
  _hasInvalidInput = () => {
    // возвращаем true, если хотя бы один не прошел проверку
    return this._inputList.some((inputElement) => {
      // проверяем условие, есть ли хотя бы один элемент, не прошедший валидацию
      return !inputElement.validity.valid;
    });
  };

  // функция переключения состояния кпонки sabmit (массив полей, кнопка sabmit)
  _toggleButtonState = () => {
    // если хотя бы одно поле ввода не прошло проверку на валидность
    if (this._hasInvalidInput()) {
      // делаем кнопку неактивной
      this._buttonSubmitForm.classList.add(this._inactiveButtonClass);
      // иначе - делаем активной
    } else {
      this._buttonSubmitForm.classList.remove(this._inactiveButtonClass);
    }
  };

  // функция обнуления ошибок
  _resetFormErrors = () => {
    // проходим по каждому полю ввода
    this._inputList.forEach((inputArrayElement) => {
      // находим соответствующий span ошибки
      const errorElement = this._formElement.querySelector(`.${inputArrayElement.id}-error`);
      // очищаем ошибки
      inputArrayElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    });
  };
}