import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from './TranslateService';
import { APIRestFulService } from './apiRestful.service';
import { AuthService } from './auth.service';
import { AppSettings } from './global.settings';
@Injectable()
export class AuthGuard implements CanActivate {
    AllIsOK = true;
    constructor(private router: Router, private authService: AuthService
        , private translate: TranslateService, private httRequest: APIRestFulService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        return new Promise((resolve) => {
            if (!AppSettings.resourceBundle) {
                this.translate.setTranslate().finally(() => {
                    this.httRequest.getRequest(AppSettings.WebApiUrl + "SelfServices/GetCurrent").subscribe(RUser => {
                        
                        AppSettings.PublicUserInfo = RUser;
                        this.authService.setAuth();
                    });
                }).subscribe(res2 => {
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
        });
    }

}