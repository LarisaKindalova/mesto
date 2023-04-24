export class FormValidator {
  constructor (config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }

  enableValidation () {
    this._setEventListeners();
    this._toggleButtonState();
  };

  resetFormValidation () {
    this._disableButton();
    this._inputList.forEach((input) =>{
      this._hideInputError(input);
    })
  }

  //показать текст ошибки
  _showInputError = (input, errorMessage) => {
    this._inputId = input.id;
    this._errorElement = this._formElement.querySelector(`.${this._inputId}-error`);
    input.classList.add(this._config.errorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._config.activeErrorClass);
  };

  // скрыть текст ошибки
  _hideInputError = (input) => {
    this._inputId = input.id;
    this._errorElement = this._formElement.querySelector(`.${this._inputId}-error`);
    input.classList.remove(this._config.errorClass);
    this._errorElement.classList.remove(this._config.activeErrorClass);
    this._errorElement.textContent = " ";
  };

  // проверяем валидность формы и вызываем соот-ющий метод
  _checkInputValidity = (input) =>{
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  // делаем кнопку неактивной
  _disableButton () {
    this._buttonElement.classList.add(this._config.disabledsubmitButtonClass);
    this._buttonElement.disabled = true;
  };

  //делаем кнопку активной
  _enableButton () {
    this._buttonElement.classList.remove(this._config.disabledsubmitButtonClass);
    this._buttonElement.disabled = false;
  };

  //если инпуты не вылидные
  _hasInvalidInput ()  {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    };
  };

  _setEventListeners()  {
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    this._formElement.addEventListener('reset', () => {
      this._disableButton(this._buttonElement)
    });
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }
};




