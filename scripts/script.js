// Переменные

let page = document.querySelector('.page');
// находим поля формы для ввода данных страницы
let profileNameEdit = document.querySelector('.form-edit__item_field_profile-name');
let profileStatusEdit = document.querySelector('.form-edit__item_field_profile-status');
// открытие popup-а  
let profileButtonEdit = page.querySelector('.profile__button-edit');
let popup = page.querySelector('.popup');
// закрытие popup-а 
let popupButtonClose = page.querySelector('.popup__button-close');
// сохранение информации из форм на странице
let formElement = document.querySelector('.form-edit');

// Функции

// функция переноса данных страницы в поля popup-а (name и status профиля)
function readProfileInfo() {
  let profileName = document.querySelector('.profile__name').textContent;
  profileNameEdit.value = profileName;
  let profileStatus = document.querySelector('.profile__status').textContent;
  profileStatusEdit.value = profileStatus;
}

// функция открытия popup-а
function openPopup() {
  popup.classList.add('popup_opened');
  readProfileInfo();
}

// функция закрытия popup-а 
function closePopup() {
  popup.classList.remove('popup_opened');
}

// функция обработчика «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault(); // отмена обновления окна браузера
  // находим поля формы в DOM и получаем значения полей из свойств value
  let nameInput = document.querySelector('.form-edit__item_field_profile-name').value;
  let statusInput = document.querySelector('.form-edit__item_field_profile-status').value;
  // выберираем элементы, куда буудут вставлены значения полей
  let nameOutput = document.querySelector('.profile__name');
  let statusOutput = document.querySelector('.profile__status');
  // подставляем новые значения с помощью textContent
  nameOutput.textContent = nameInput;
  statusOutput.textContent = statusInput;
  closePopup();
}

// Слушатели событий

// нажатие на кнопку редактирования профиля
profileButtonEdit.addEventListener('click', openPopup);
// нажатие на кнопку закрытия редактирования профиля
popupButtonClose.addEventListener('click', closePopup);
// нажатие на кнопку "Сохранить" в форме редактирования профиля
formElement.addEventListener('submit', handleFormSubmit); 

