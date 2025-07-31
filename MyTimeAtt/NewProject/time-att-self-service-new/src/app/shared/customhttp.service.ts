import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSettings } from './global.settings';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService  {
  constructor(private httpClient: HttpClient, private _router: Router, private _route: ActivatedRoute) {
    //super();
  }

  request(url: string , options?: any): Observable<any> {
    return this.intercept( this.httpClient.request('GET', url, { ...this.getRequestOptionArgs(), ...options })
      .pipe(
        tap(data => console.log(data)),
        catchError(this.catchErrors())
      )
    );
  }

  get(url: string, options?: any): Observable<any> {
   
    return this.intercept( this.httpClient.get(url, this.getRequestOptionArgs())
      .pipe(
        catchError(this.catchErrors())
      ));
  }

  post(url: string, body: any, options?: any): Observable<any> {
    return this.intercept( this.httpClient.post(url, body, { ...this.getRequestOptionArgs(), ...options })
      .pipe(
        catchError(this.catchErrors())
      ));
  }
  postForm(url: string, body: FormData, options?: any): Observable<any> {
    return this.intercept( this.httpClient.post(url, body, { ...this.getRequestOptionArgsForm(), ...options })
      .pipe(
        catchError(this.catchErrors())
      ));
  }

  put(url: string, body: any, options?: any): Observable<any> {
    return this.intercept( this.httpClient.put(url, body, { ...this.getRequestOptionArgs(), ...options })
      .pipe(
        catchError(this.catchErrors())
      ));
  }

  delete(url: string, options?: any): Observable<any> {
    return this.intercept(this.httpClient.delete(url, { ...this.getRequestOptionArgs(), ...options })
      .pipe(
        catchError(this.catchErrors())
      ));
  }

  private catchErrors() {
    return (err: HttpErrorResponse) => {
      if (err.status === 401 || err.status === 403) {
        this._router.navigate(['accessdenied']);
      }
      return throwError(err);
    };
  }
  
  getRequestOptionArgs(): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': this.getCurrentLanguage()
    });

    return { headers: headers, withCredentials: true };
  }
  getRequestOptionArgsForm(): any {
    let headers = new HttpHeaders({
      'Accept-Language': this.getCurrentLanguage()
    });

    return { headers: headers, withCredentials: true };
  }


  // private catchErrors() {
  //   return (res: Response) => {

  //     if (res.status === 401 || res.status === 403) {
  //       //handle authorization errors
  //       //in this example I am navigating to logout route which brings the login screen
  //       this._router.navigate(['accessdenied']);
  //     }
  //     return Observable.throw(res);
  //   };
  // }
  // getRequestOptionArgs(): RequestOptionsArgs {
  //   // let options = new RequestOptions();
  //   // options.headers = new Headers();
  //   // options.headers.append('Content-Type', 'application/json');
  //   // options.headers.append('Accept-Language', this.getCurrentLanguage());
  //    let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept-Language': this.getCurrentLanguage()
  //   });  
  //   // options.headers.append('Authorization', 'Basic ' + btoa(AppSettings.AuthorizationHeader));
  //   options.withCredentials = true;
  //   return options;
  // }
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
  private getcookie(cookiename: string) {
    var results = document.cookie.match ( '(^|;) ?' + cookiename + '=([^;]*)(;|$)' );
    if ( results )
      return ( (results[2] ) );
    else
      return null;
  }
  private getUserInfo(): string|null {
    try {
      debugger;
      let cookie =document.cookie ;
      if (cookie && cookie.length > 0 && cookie.indexOf("UserInfo") >= 0) {
        let cookiearry = document.cookie.split(";");
        let userinfo = this.getcookie("UserInfo");
        userinfo=decodeURIComponent( window.atob(userinfo!));
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
  intercept(observable: Observable<ArrayBuffer>): Observable<ArrayBuffer> {

    // 403  Forbidden
    // 401 Unauthorized
    return observable.pipe(
      tap((res: any) => {
        debugger;
        console.log("ComeHere")
        let userInfo = this.getUserInfo();
        if (userInfo) {
          localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Ensure userInfo is a string
        }
      }),
      catchError((err: { status: number; url: string }) => {
        if (err.status === 403 || err.status === 401) {
          if (!err.url.toLowerCase().endsWith('login')) {
            this._router.navigate(['login'], { relativeTo: this._route });
            return EMPTY;
          }
        }
        return throwError(err);
      })
    );
  }
}
