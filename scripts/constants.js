const initialCards = [
  {
    name: 'Мончегорск, Мурманская область',
    link: 'https://cs5.pikabu.ru/post_img/2015/12/20/11/og_og_1450641426272621479.jpg'
  },
  {
    name: 'Ленские столбыб Саха Якутия',
    link: 'https://avatars.dzeninfra.ru/get-zen_doc/1247665/pub_5be562d6b6e60f00aec8e6c2_5be9620d26cf1600a9cb6cd6/scale_1200'
  },
  {
    name: 'Камчатка',
    link: 'https://traveltimes.ru/wp-content/uploads/2021/05/1-83-hmrxz1vdd1qdnxc7eda.jpg'
  },
  {
    name: 'Гейзеровое озеро, горный Алтай',
    link: 'https://avatars.dzeninfra.ru/get-zen_doc/3342202/pub_6247cc363b339f26d5173fdb_6247cc972a9b51118153157b/scale_1200'
  },
  {
    name: 'Мыс Евстафьева, Сахалин',
    link: 'https://vsegda-pomnim.com/uploads/posts/2022-04/1651004018_61-vsegda-pomnim-com-p-sakhalin-more-foto-64.jpg'
  },
  {
    name: 'Байкал',
    link: 'http://fotorelax.ru/wp-content/uploads/2016/10/lake-baikal-04.jpg'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  activeErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_error-type',
  submitButtonSelector: '.popup__submit-button',
  disabledsubmitButtonClass: 'popup__submit-button_disabled'
  };

  export { initialCards, validationConfig }
