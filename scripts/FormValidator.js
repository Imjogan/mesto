// Импорты
import { profileButtonEdit, profileButtonAdd } from './script.js';

// Создаем класс карточки и применяем экспорт по-умолчанию
export default class FormValidator {
  // в конструктор принимаем объект с селекторами формы и текущий селектор формы
	constructor(data, activeFormValidation) {
    // селекторы формы
		this._formSelector = data.formSelector;
		this._inputSelector = data.inputSelector;
	  this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._fieldsSelector = data.fieldsSelector;
    // текущий селектор формы
    this._activeFormValidation = activeFormValidation;
	}

  // функция отобржения ошибки (форма, поле ввода, сообщение ошибки)
  _showInputError = (formElement, inputElement, errorMessage) => {
    // находим у данной формы селектор сообщения ошибки, принадлежащий полю ввода
    // и заносим данные в константу
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // добавляем полю ввода селектор ошибки (красная граница)
    inputElement.classList.add(this._inputErrorClass);
    // заносим в тест ошибки входное сообщение ошибки
    errorElement.textContent = errorMessage;
    // делаем текст ошибки видимым
    errorElement.classList.add(this._errorClass);
  };

  // функция скрытия ошибки (форма, поле ввода)
  _hideInputError = (formElement, inputElement) => {
    // находим у данной формы селектор сообщения ошибки, принадлежащий полю ввода
    // и заносим данные в константу
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // удаляем селектор ошибки поля ввода (красная граница)
    inputElement.classList.remove(this._inputErrorClass);
    // скрываем текст ошибки
    errorElement.classList.remove(this._errorClass);
    // очищаем текст ошибки
    errorElement.textContent = '';
  };

  // функция проверки поля на валидность (форма, поле ввода)
  _checkInputValidity = (formElement, inputElement) => {
    // если поле не проходит валидацию - покажем ошибки
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
      // иначе - скроем ее
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  // функция добавления слушателей к полям (форма)
  _setEventListeners = (formElement) => {
    // создаем массив и заполяем его полями воода данной формы
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    // находим кнопку sabmit-а
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    // вызываем функцию переключения состояния кнопки sabmit (поля формы, кнопка sabmit формы)
    this._toggleButtonState(inputList, buttonElement);
    // добавляем слушатель для отслеживания открытия попапов с формами
    document.addEventListener('click', (evt) => {
      // если открыт попап добавления карточки
      if(evt.target === profileButtonAdd) {
        // сбросим ошибки формы и проверим кнопку сабмита
        this._resetFormErrors(formElement);
        this._toggleButtonState(inputList, buttonElement);
        // если открыт попап редактирования профиля
      } else if(evt.target === profileButtonEdit) {
        // очищаем ошибки формы
        this._resetFormErrors(formElement);
      }
    });
    // проходимся по массиву и к каждому полю ввода применяем функцию
    inputList.forEach((inputElement) => {
      // добавляем слушатель события на ввод в поле 
      inputElement.addEventListener('input', () => {
        // вызываем функцию проверки валидности поля
        this._checkInputValidity(formElement, inputElement);
        // и функцию переключения состояния кнопки sabmit
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  // функция, ответственная за включение валидации форм
  enableValidation = () => {
    // заполняем массив формами на странице
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    // к каждой форме применяем функцию
    formList.forEach((formElement) => {
      // добавляем слушатель на отправку формы
      formElement.addEventListener('submit', (evt) => {
        // запрещаем браузеру обновлять страницу
        evt.preventDefault();
      });
      // заполняем массив полями данной формы
      const fieldsetList = Array.from(formElement.querySelectorAll(this._fieldsSelector));
      // к каждому полю применяем функцию
      fieldsetList.forEach((fieldSet) => {
        // вызываем функцию добавления слушателей
        this._setEventListeners(fieldSet);
      });
    });
  };

  // функция проверки поля на валидность
  _hasInvalidInput = (inputList) => {
    // возвращаем true, если хотя бы один не прошел проверку
    return inputList.some((inputElement) => {
      // проверяем условие, есть ли хотя бы один элемент, не прошедший валидацию
      return !inputElement.validity.valid;
    });
  };

  // функция переключения состояния кпонки sabmit (массив полей, кнопка sabmit)
  _toggleButtonState = (inputList, buttonElement) => {
    // если хотя бы одно поле ввода не прошло проверку на валидность
    if (this._hasInvalidInput(inputList)) {
      // делаем кнопку неактивной
      buttonElement.classList.add(this._inactiveButtonClass);
      // иначе - делаем активной
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  // функция обнуления ошибок
  _resetFormErrors = (formElement) => {
    // наполняем константу полями воода данной формы
    const formInputs = Array.from(formElement.querySelectorAll(this._inputSelector));
    // проходим по каждому полю ввода
    formInputs.forEach((inputArrayElement) => {
      // находим соответствующий span ошибки
      const errorElement = formElement.querySelector(`.${inputArrayElement.id}-error`);
      // очищаем ошибки
      inputArrayElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    });
  };
}