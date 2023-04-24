import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor ({popupSelector, handelSubmitForm}) {
    super(popupSelector)
    this._handelSubmitForm = handelSubmitForm; //колбэк-функция
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupInputlist = this._popupForm.querySelectorAll('.popup__input')//достаем все элементы поле
  }

//собирает данные всех полей
  _getInputValues() {
    //создаем пустой объект и добавляем в него значение всех полей
    this._formValues = {};
    this._popupInputlist.forEach(input =>
      this._formValues[input.name] = input.value
      )
      // возвращаем объект значений
      return this._formValues;
  }

  //сбрасывает форму
  close () {
    super.close()
    this._popupForm.reset()
  }

  //добавляtn обработчик клика иконке закрытия,и обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      //в функцию колбэк передадим результат работы getInputValues
      this._handelSubmitForm(this._getInputValues());
    })
  }
}
