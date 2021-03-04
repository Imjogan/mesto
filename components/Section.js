// Создаем класс отрисовки элементов на странице
export default class Section {
  // в конструктор принимаем объект с содержимым карточек, объект с селекторами шаблона и селектор template
	constructor({items, renderer}, containerSelector) {
    // массив данных, добавляемых на страницу
		this._items = items;
    // функция создания и отрисовки данных (один элемент)
		this._renderer = renderer;
    // селектор контейнера
		this._containerSelector = containerSelector;
	}

  // метод для отрисовки всех элементов
  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  // метод (принимает DOM-элемент и добавляет в контейнер)
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}