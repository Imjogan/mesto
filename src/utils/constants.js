// объект с селекторами для валидации форм
export const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
  fieldsSelector: '.form__fields'
};

// объект с селекторами для шаблона карточек
export const configGenerationCards = {
  cardElement: '.element',
  cardImage: '.element__image',
  cardTitle: '.element__title',
  cardLike: '.element__like',
  cardTrash: '.element__trash-button',
  cardLikeCounter: '.element__like-counter'
};
