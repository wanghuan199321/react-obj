
import {config } from '../config/app.config.jsx';


export default class Auth {
  
  constructor() {
     this.apiUrl = config.API_ENDPOINT;
     this.captchaUrl = config.API_CAPTCHA;
     this.remoteHost = config.API_HOST;
     this.APP_COPY_RIGHT = config.APP_COPY_RIGHT;
     this.getCaptcha = this.getCaptcha.bind(this);
     this.login = this.login.bind(this);
     this.logout = this.logout.bind(this);
     this.getUser = this.getUser.bind(this);
     this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  getCaptcha() {
      this.captchaUrl = config.API_CAPTCHA+'?t='+ Date.now()+ Math.random();
      return this.captchaUrl;
  }

   login(user, password) {
    if (user === this.getUser()) {
           localStorage.setItem('username', user);
        return true;
      }

      return false;
    }

    logout() {
       localStorage.removeItem('username');
       window.location.href = "/";
    }

    getUser() {
      return localStorage.getItem('username');
    }

    isLoggedIn() {
      return this.getUser() !== null;
    }

 
}