import { Injectable } from '@angular/core';
import { APIRestFulService } from './apiRestful.service';
import { AppSettings } from './global.settings';
 import { User, UserTokenInfo } from './usertokeninfo';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private userInfo: UserTokenInfo|null = null ;
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
      let userinfoLS: string = localStorage.getItem('userInfo')!;
      console.log("1")
      console.log(userinfoLS)
      let userjson: any;
      if (userinfoLS && userinfoLS.length > 0) {
        
        userjson = JSON.parse(userinfoLS);
        userjson = JSON.parse(userjson);
        console.log("2")
console.log(userjson)
console.log(userjson.UserId)

      }
      else {
        userjson = null;
      }
      if (userjson) {
        console.log("if3")
        this.userInfo = new UserTokenInfo(userjson);
        console.log(this.userInfo)
       
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


