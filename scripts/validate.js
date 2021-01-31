// Валидация форм

// конфигурация для валидации
const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
  fieldsSelector: '.form__fields'
};

// функция отобржения ошибки (форма, поле ввода, сообщение ошибки)
const showInputError = (formElement, inputElement, errorMessage) => {
  // находим у данной формы селектор сообщения ошибки, принадлежащий полю ввода
  // и заносим данные в константу
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // добавляем полю ввода селектор ошибки (красная граница)
  inputElement.classList.add(configValidation.inputErrorClass);
  // заносим в тест ошибки входное сообщение ошибки
  errorElement.textContent = errorMessage;
  // делаем текст ошибки видимым
  errorElement.classList.add(configValidation.errorClass);
};

// функция скрытия ошибки (форма, поле ввода)
const hideInputError = (formElement, inputElement) => {
  // находим у данной формы селектор сообщения ошибки, принадлежащий полю ввода
  // и заносим данные в константу
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // удаляем селектор ошибки поля ввода (красная граница)
  inputElement.classList.remove(configValidation.inputErrorClass);
  // скрываем текст ошибки
  errorElement.classList.remove(configValidation.errorClass);
  // очищаем текст ошибки
  errorElement.textContent = '';
};

// функция проверки поля на валидность (форма, поле ввода)
const checkInputValidity = (formElement, inputElement) => {
  // если поле не проходит валидацию - покажем ошибки
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    // иначе - скроем ее
  } else {
    hideInputError(formElement, inputElement);
  }
};

// функция добавления слушателей к полям (форма)
const setEventListeners = (formElement) => {
  // создаем массив и заполяем его полями воода данной формы
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  // находим кнопку sabmit-а
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  // вызываем функцию переключения состояния кнопки sabmit (поля формы, кнопка sabmit формы)
  toggleButtonState(inputList, buttonElement);
  // проходимся по массиву и к каждому полю ввода применяем функцию
  inputList.forEach((inputElement) => {
    // добавляем слушатель события на ввод в поле 
    inputElement.addEventListener('input', function () {
      // вызываем функцию проверки валидности поля
      checkInputValidity(formElement, inputElement);
      // и функцию переключения состояния кнопки sabmit
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// функция, ответственная за включение валидации форм
const enableValidation = () => {
  // заполняем массив формами на странице
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  // к каждой форме применяем функцию
  formList.forEach((formElement) => {
    // добавляем слушатель на отправку формы
    formElement.addEventListener('submit', function (evt) {
      // запрещаем браузеру обновлять страницу
      evt.preventDefault();
    });
    // заполняем массив полями данной формы
    const fieldsetList = Array.from(formElement.querySelectorAll(configValidation.fieldsSelector));
    // к каждому полю применяем функцию
    fieldsetList.forEach((fieldSet) => {
      // вызываем функцию добавления слушателей
      setEventListeners(fieldSet);
    });
  });
};

// функция проверки поля на валидность
const hasInvalidInput = (inputList) => {
  // возвращаем true, если хотя бы один не прошел проверку
  return inputList.some((inputElement) => {
    // проверяем условие, есть ли хотя бы один элемент, не прошедший валидацию
    return !inputElement.validity.valid;
  });
};

// функция переключения состояния кпонки sabmit (массив полей, кнопка sabmit)
const toggleButtonState = (inputList, buttonElement) => {
  // если хотя бы одно поле ввода не прошло проверку на валидность
  if (hasInvalidInput(inputList)) {
    // делаем кнопку неактивной
    buttonElement.classList.add(configValidation.inactiveButtonClass);
    // иначе - делаем активной
  } else {
    buttonElement.classList.remove(configValidation.inactiveButtonClass);
  }
};

// функция обнуления ошибок
const resetFormErrors = (formElement) => {
  const formInputs = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  formInputs.forEach(function (inputArrayElement) {
    const errorElement = formElement.querySelector(`.${inputArrayElement.id}-error`);
    inputArrayElement.classList.remove(configValidation.inputErrorClass);
    errorElement.classList.remove(configValidation.errorClass);
    errorElement.textContent = '';
  });
};

// включаем валидацию на сайте
enableValidation();
