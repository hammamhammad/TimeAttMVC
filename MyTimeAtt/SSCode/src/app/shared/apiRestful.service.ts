import { Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CustomHttp } from './customhttp.service';
import { AppSettings } from './global.settings';
import { ResponseResult } from './responseresult';
import './rxjs-operatiors';
import { Router } from '@angular/router';


@Injectable()
export class APIRestFulService {

  constructor(private http: CustomHttp, private _router: Router) { }
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
//   private handleError = (error: Response) => {
//      if (error.status === 401 || error.status === 403) {
//         this._router.navigate(['login']);
//    this._router.navigate(['Login']);
//    return Observable.of([]);
// }
  private handleError(error: Response) {

    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.error(errMsg); // log to console instead
     return Observable.of(new ResponseResult());
      // return Observable.throw(error);
    }
  
  // getPromise(uri: string) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   this.createAuthorizationHeader(headers);
  //   return this.http.get(uri, {
  //     headers: headers
  //   }).toPromise()
  //     .then(this.extractData)
  //     .catch(this.handleError);
  // }
  public getRequestAS(uri: string) {
    return this.http.get(uri).map(res => res.json());
  }
  public getRequest(uri: string) {
    let responseresult: ResponseResult = new ResponseResult();
    return this.http.get(uri).map((res: Response) => {
      if (!res.ok) {
        throw new Error(res.toString());
      }
      else {
        responseresult.mapResult(res.json())
        return responseresult;
      }
    }).catch(this.handleError);
  }
  postFormData(uri: string, data?: any, mapJson: boolean = true){
    let responseresult: ResponseResult = new ResponseResult();
    if (mapJson) {
      return this.http.postFormData(uri, data)
        .map((response: Response) => {
          if (!response.ok) {
            throw new Error(response.toString());
          } else {
            responseresult.mapResult(<any>(response).json());
            return responseresult;
          }

        }).catch(this.handleError);
    }
    else {
      return this.http.postFormData(uri, data).catch(this.handleError);
    }
  }
  post(uri: string, data?: any, mapJson: boolean = true) {
    let responseresult: ResponseResult = new ResponseResult();
    if (mapJson) {
      return this.http.post(uri, JSON.stringify(data))
        .map((response: Response) => {
          if (!response.ok) {
            throw new Error(response.toString());
          } else {
            responseresult.mapResult(<any>(response).json());
            return responseresult;
          }

        }).catch(this.handleError);
    }
    else {
      return this.http.post(uri, JSON.stringify(data)).catch(this.handleError);
    }
  }

}
