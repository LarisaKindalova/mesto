//показать текст ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.activeErrorClass);
  };

  // скрыть текст ошибки
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.errorClass);
    errorElement.classList.remove(config.activeErrorClass);
    errorElement.textContent = " ";
  };

// проверяем валидность формы и вызываем соот-ющий метод
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};
// делаем кнопку неактивной
const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.disabledsubmitButtonClass);
  buttonElement.disabled = true;
};

//делаем кнопку активной
const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.disabledsubmitButtonClass);
  buttonElement.disabled= false;
};


//если инпуты не вылидные
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
};

//установили слушатели импутам. Все слушатели в отдельной функции
const setEventListeners =(formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

   toggleButtonState(inputList, buttonElement, config);

   formElement.addEventListener('reset', ()=> {
    disableButton(buttonElement, config);
   });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach ((formElement) => {
    setEventListeners(formElement, config);
  });
 };

 enableValidation(validationConfig);
