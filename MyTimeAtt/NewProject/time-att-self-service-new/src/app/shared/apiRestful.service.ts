import { CustomHttpService } from './customhttp.service';
import './rxjs-operatiors';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppSettings } from './global.settings';
import { ResponseResult } from './responseresult';

@Injectable()
export class APIRestFulService {

  constructor(private http: CustomHttpService, private _router: Router) { }
 
  //   private handleError = (error: Response) => {
//      if (error.status === 401 || error.status === 403) {
//         this._router.navigate(['login']);
//    this._router.navigate(['Login']);
//    return Observable.of([]);
// }
private extractData(res: HttpResponse<any>) {
  console.log(res)
       
  let body = res.body;

  return body || {};
}

private handleError(error: HttpResponse<any>) {
  // if (error.status === 401 || error.status === 403) {
  //   this._router.navigate(['login']);
  //   return throwError(() => new Error('Unauthorized or Forbidden'));
  // } else {
  //   console.log(error)
  //   let errMsg = error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   return throwError(() => new Error(errMsg));
  // }
 console.log(error)
 let errMsg =''
  if(error)
     errMsg = error!.status ? `${error!.status} - ${error!.statusText}` : 'Server error';
  else
    errMsg = 'Server error'
    console.error(errMsg); // log to console instead
    console.log("errMsg"); // log to console instead
    return throwError(()=>new ResponseResult());
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
  public getRequestAS(uri: string): Observable<any> {
    return this.http.get(uri, { observe: 'response' })
      .pipe(
        map(res=>res),
        catchError(err=>this.handleError(err))
      );
  }
 
  public getRequest(uri: string): Observable<ResponseResult> {
    return this.http.get(uri, { observe: 'response' })
      .pipe(
        map(response => {
          console.log("response")
          console.log(response)
          if (!(response.ok)) {
            throw new Error(`Error status: ${response.status}`);
          } else {
            console.log(response.body)
            // Assuming ResponseResult has a method to map response data
            let result = new ResponseResult();
            result.mapResult(response.body);
            return result;
          }
        }),
        catchError(err=>this.handleError(err))
      );
  }
  public postFormData(uri: string, data: FormData, mapJson: boolean = true): Observable<any> {
    if (mapJson) {
      return this.http.postForm(uri, data, { observe: 'response' })
        .pipe(
          map(response => {
            console.log("POst sta")
            console.log(response)
            if (!response.ok) {
              throw new Error(`Error status: ${response.status}`);
            } else {
              let result = new ResponseResult();
              result.mapResult(response.body);
              return result;
            }
          }),
          catchError(err=>this.handleError(err))
        );
    } else {
      return this.http.postForm(uri, data!, { observe: 'response' })
        .pipe(catchError(err=>this.handleError(err)));
    }
  }

  public post(uri: string, data?: any, mapJson: boolean = true): Observable<any> {
    if (mapJson) {
      return this.http.post(uri, data, { observe: 'response' })
        .pipe(
          map(response => {
            console.log(response)
            console.log("response")
            if (!response.ok) {
              throw new Error(`Error status: ${response.status}`);
            } else {
              let result = new ResponseResult();
              result.mapResult(response.body);
              return result;
            }
          }),
          catchError(err=>this.handleError(err))
        );
    } else {
    
      return this.http.post(uri, JSON.stringify(data), { observe: 'response' })
        .pipe(catchError(err=>this.handleError(err)));
    }
  }

}
