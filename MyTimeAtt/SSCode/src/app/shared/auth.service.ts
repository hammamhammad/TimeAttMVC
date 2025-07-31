import { Injectable } from '@angular/core';
import { APIRestFulService } from './apiRestful.service';
import { AppSettings } from './global.settings';
 import { User, UserTokenInfo } from './usertokeninfo';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private userInfo: UserTokenInfo = null;
  private authenticated: boolean = false;
private Auth$=new BehaviorSubject<boolean>(false)

  constructor(private httRequest: APIRestFulService) { }

  getIsAuth(): Observable<boolean> {
    return this.Auth$.asObservable();
  }
  setAuth(){
    this.Auth$.next(true);
  }
  private getUserInfo() {
    try {

      let userinfoLS: string = localStorage.getItem('userInfo');
      let userjson: JSON;
      if (userinfoLS && userinfoLS.length > 0) {
        userjson = JSON.parse(userinfoLS);
      }
      else {
        userjson = null;
      }
      if (userjson) {
        this.userInfo = new UserTokenInfo(userjson);
      }
      else {
        this.userInfo = null;
      }
      return this.userInfo;
    }
    catch (ex) {
      return null;
    }
  }
  public UserInfForLogin(){
      return this.getUserInfo();
  }
  public UserInfo() {
    if (this.IsAuthCookieExist())
      return this.getUserInfo();
    return null;
  }
  public getUserName() {
    this.getUserInfo();
    return this.userInfo ? this.userInfo.UserName : '';
  }
  public getEmployeeNumber() {
    this.getUserInfo();
    return this.userInfo ? this.userInfo.EmployeeNumber : '';
  }
  public getUserEmpID() {
    this.getUserInfo();
    return this.userInfo ? this.userInfo.UserEmpID : '';
  }
  public getEmployeeName() {
    this.getUserInfo();
    return this.userInfo ? this.userInfo.EmployeeName : '';
  }
 

  public login(creds: User) {
    let url = AppSettings.WebApiUrl + 'Anonymous/login';
    return this.httRequest.post(url, creds);
  }
  public logout() {
    let url = AppSettings.WebApiUrl + 'Anonymous/logout';
    this.authenticated = false;
    //this.logoutPromisies();
    //  localStorage.setItem('userInfo', null);
    return this.httRequest.post(url);

  }
  

  contnueLogin() {
    return this.httRequest.getRequest(AppSettings.IamHereUrl);
  }
  public isAuthenticated() {
    return this.httRequest.getRequest(AppSettings.IamHereUrl);
  }
  IsAuthCookieExist() {
    try {
     // if(jQuery.cookie("ASPXAUTH") != null && !jQuery.cookie("ASPXAUTH")) 
      let cookie = document.cookie;
      if (cookie && cookie.length > 0 && cookie.indexOf("ASPXAUTH") >= 0) {

        return true
      }
      else{
        return false;
    }
  }
    catch (ex) {
      return false;
    }
  }
}


