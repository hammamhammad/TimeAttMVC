import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TranslateService } from './TranslateService';
import { APIRestFulService } from './apiRestful.service';
import { AuthService } from './auth.service';
import { AppSettings } from './global.settings';

@Injectable({
  providedIn: 'root' // Angular 6+ way of providing services
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private translate: TranslateService, private httRequest: APIRestFulService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      console.log("!AppSettings.resourceBundle")
      console.log(!AppSettings.resourceBundle)
      if (!AppSettings.resourceBundle) {
        this.translate.setTranslate().pipe(
          finalize(() => {
            this.httRequest.getRequestAS(AppSettings.WebApiUrl + "SelfServices/GetCurrent").subscribe(RUser => {
              AppSettings.PublicUserInfo = RUser;
              this.authService.setAuth();
          });

          //   console.log("fin")
          //  this.httRequest.getRequest(`${AppSettings.WebApiUrl}SelfServices/GetCurrent`).subscribe(RUser => {
          //   console.log("RUser") 
          //   console.log(RUser) 
          //   AppSettings.PublicUserInfo = RUser;
          //     this.authService.setAuth();
          //     let isAuth: boolean = this.authService.IsAuthCookieExist();
          //     console.log("isAuth")
          //     console.log(!isAuth)
          //     if (!isAuth) {
          //       this.router.navigate(['login']);
          //     }
          //     resolve(isAuth);
          //   });
          })
        ).subscribe(res2 => {
          console.log("res2")
          console.log(res2)
          // AppSettings.resourceBundle = res2;
          AppSettings.resourceBundle = res2;
          let isAuth: boolean = this.authService.IsAuthCookieExist();
          
          resolve(isAuth);
          if (!isAuth)
              this.router.navigate(['login']);
          return isAuth;
        });
      } else {
        let isAuth: boolean = this.authService.IsAuthCookieExist();
        resolve(isAuth);
        if (!isAuth)
            this.router.navigate(['login']);
        return isAuth;
    }
    return;
    });
    
  }
}
