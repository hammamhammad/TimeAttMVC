import { Injectable } from '@angular/core';
import { Http, Request, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './global.settings';
import './rxjs-operatiors';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class CustomHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _router: Router, private _route: ActivatedRoute) {

    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, this.getRequestOptionArgs()).catch(this.catchErrors()));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, this.getRequestOptionArgs()).catch(this.catchErrors()));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs()).catch(this.catchErrors()));
  }
  postFormData(url: string, body: any): Observable<Response> {
    let headers = new Headers()
    let options = new RequestOptions({ headers: headers });
    return this.intercept(super.post(url, body, options).catch(this.catchErrors()));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs()).catch(this.catchErrors()));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, this.getRequestOptionArgs()).catch(this.catchErrors()));
  }
  private catchErrors() {
    return (res: Response) => {

      if (res.status === 401 || res.status === 403) {
        //handle authorization errors
        //in this example I am navigating to logout route which brings the login screen
        this._router.navigate(['accessdenied']);
      }
      return Observable.throw(res);
    };
  }
  getRequestOptionArgs(): RequestOptionsArgs {
    let options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Accept-Language', this.getCurrentLanguage());
    // options.headers.append('Authorization', 'Basic ' + btoa(AppSettings.AuthorizationHeader));
    options.withCredentials = true;
    return options;
  }
  private getCurrentLanguage():string{
    let _culture='ar'
    let cookie = document.cookie;
    if (cookie && cookie.length > 0 && cookie.indexOf("_culture") >= 0) {
      let cookiearry = document.cookie.split(";");
      let userinfo = '';
      cookiearry.forEach(e => {
        if (e.indexOf("_culture") >= 0) {
          _culture = e.split('_culture=')[1];
        }
      });
    }
    AppSettings.CurrentLang=_culture;
    return _culture;
  }
  private getcookie(cookiename) {
    var results = document.cookie.match ( '(^|;) ?' + cookiename + '=([^;]*)(;|$)' );
    if ( results )
      return ( (results[2] ) );
    else
      return null;
  }
  private getUserInfo(): string {
    try {
     
      let cookie =document.cookie ;
      if (cookie && cookie.length > 0 && cookie.indexOf("UserInfo") >= 0) {
        let cookiearry = document.cookie.split(";");
        let userinfo = this.getcookie("UserInfo");
        userinfo=decodeURIComponent( window.atob(userinfo));
        // cookiearry.forEach(e => {
        //   if (e.indexOf("UserInfo") >= 0) {
        //     userinfo = e;
        //   }
        // });
return userinfo;
        //return userinfo.split("UserInfo=")[1];//document.cookie.split(";")[1].split("UserInfo=")[1];
      }
      else
        return null;
    }
    catch (ex) {
      return null;
    }
    // let user = AppSettings.AuthorizationHeader.split(':')[0];
    // return '{"Username":"' + user + '","Shortname":"HANDOUMEH",' +
    //   '"CreatedDate":"2016-09-30","CreatedTime":"0:47:55","ExpiryDate":"2017-09-30","ExpiryTime":"0:49:55"}';
  }
  intercept(observable: Observable<Response>): Observable<Response> {

    // 403  Forbidden
    // 401 Unauthorized
    return observable.do(res => {
      let userInfo = this.getUserInfo();
      if (userInfo) {
        localStorage.setItem('userInfo', userInfo);
      }

    }).
    catch((err, source) => {
    if (err.status === 403 || err.status === 401) {
          if (!err.url.toLowerCase().endsWith('login')) {
            this._router.navigate(['login'], { relativeTo: this._route });
            return Observable.empty();
          }
        }
     return Observable.throw(err);
    });
  }
}
