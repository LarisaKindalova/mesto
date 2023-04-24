
export class Section {
  constructor ({items, renderer}, selector) {
  this._initialItems = items;
  this._renderer = renderer; //функция
  this._container = document.querySelector(selector);
  }

  //отрисовка карточек на странице
  renderItems =() => {
    this._initialItems.forEach((item) => {
      this._renderer(item);
    });
  };
    //принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
