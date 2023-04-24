export class UserInfo {
  constructor ({nameSelector, jobSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userJob = document.querySelector(jobSelector)
  }
  
  // из разметки получет данные в инпуты
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    }
  }
  //
  setUserInfo (data) {
    this._userName.textContent  = data.username; // как name в инпутах
    this._userJob.textContent = data.job;
  }
}
