// перенос данных сайта в поля popup-а (name и status профиля)
function readProfileInfo() {
  let profileName = document.querySelector('.profile__name').textContent;
  let profileNameEdit = document.querySelector('.form-edit__item_profile-name');
  profileNameEdit.value = profileName;
  
  let profileStatus = document.querySelector('.profile__status').textContent;
  let profileStatusEdit = document.querySelector('.form-edit__item_profile-status');
  profileStatusEdit.value = profileStatus;
}

// открытие popup-а  
let page = document.querySelector('.page');
let profileButtonEdit = page.querySelector('.button-edit');
let popup = page.querySelector('.popup');

function popupOpened() {
  popup.classList.add('popup_opened');
  readProfileInfo();
}

// закрытие popup-а 
profileButtonEdit.addEventListener('click', popupOpened);

let popupButtonClose = page.querySelector('.button-close');

function popupClosed() {
  popup.classList.remove('popup_opened');
}

popupButtonClose.addEventListener('click', popupClosed);

// сохранение информации из форм на странице

// Находим форму в DOM
let formElement = document.querySelector('.form-edit');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM и Получите значение полей из свойства value
    let nameInput = document.querySelector('.form-edit__item_profile-name').value;
    let statusInput = document.querySelector('.form-edit__item_profile-status').value;
    
    // Выберите элементы, куда должны быть вставлены значения полей
    let nameOutput = document.querySelector('.profile__name');
    let statusOutput = document.querySelector('.profile__status');

    // Вставьте новые значения с помощью textContent
    nameOutput.textContent = nameInput;
    statusOutput.textContent = statusInput;
    popupClosed();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 