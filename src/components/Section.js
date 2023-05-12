
export class Section {
  constructor ({ renderer, selector}) {
  this._renderer = renderer; //функция
  this._container = document.querySelector(selector);
  }

  //отрисовка карточек на странице
  renderItems =(items) => {
    items.forEach((item) => {
      this._renderer(item);
    });
  };

  addAppendItem (element) {
    this._container.append(element);
  }
    //принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
