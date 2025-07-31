import { AuthService } from './auth.service';
import { AuthGuard } from './authguard';
import { CustomHttp } from './customhttp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule ,ModuleWithProviders} from "@angular/core";
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { APIRestFulService } from './apiRestful.service';
import {LodingSpinnerService} from './loadingspinner.service';
export function CustomHttpFactory(backend: XHRBackend, defaultOptions: RequestOptions, router: Router, route: ActivatedRoute) {
    return new CustomHttp(backend, defaultOptions, router, route);
  }
@NgModule({
    imports: [HttpModule]
  
  })
  export class SharedModule {
    static forRoot(
      providedCustomHttp: any =
        {
          provide: CustomHttp, useFactory: CustomHttpFactory,
          deps: [XHRBackend, RequestOptions, Router, ActivatedRoute]
        }
    ): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [
          providedCustomHttp,APIRestFulService,AuthService, AuthGuard,LodingSpinnerService]
      };
  
    }
}