// import { AuthService } from './auth.service';
// import { AuthGuard } from './authguard';
// import { CustomHttpService } from './customhttp.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { NgModule ,ModuleWithProviders} from "@angular/core";
// import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
// import { APIRestFulService } from './apiRestful.service';
// import {LodingSpinnerService} from './loadingspinner.service';
// export function CustomHttpFactory(backend: XHRBackend, defaultOptions: RequestOptions, router: Router, route: ActivatedRoute) {
//     return new CustomHttp(backend, defaultOptions, router, route);
//   }
// @NgModule({
//     imports: [HttpModule]
  
//   })
//   export class SharedModule {
//     static forRoot(
//       providedCustomHttp: any =
//         {
//           provide: CustomHttp, useFactory: CustomHttpFactory,
//           deps: [XHRBackend, RequestOptions, Router, ActivatedRoute]
//         }
//     ): ModuleWithProviders {
//       return {
//         ngModule: SharedModule,
//         providers: [
//           providedCustomHttp,APIRestFulService,AuthService, AuthGuard,LodingSpinnerService]
//       };
  
//     }
// }
import { NgModule, ModuleWithProviders } from "@angular/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

// Updated imports
import { APIRestFulService } from './apiRestful.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './authguard';
import { CustomHttpService } from './customhttp.service'; // Assume this is updated to work with HttpClient
import { LodingSpinnerService } from "./loadingspinner.service";
//import { LoadingSpinnerService } from './loadingspinner.service'; // Corrected typo in the service name

// Ensure CustomHttpService is properly updated to use HttpClient
export function customHttpFactory(httpClient: HttpClient, router: Router, route: ActivatedRoute) {
  return new CustomHttpService(httpClient, router, route);
}

@NgModule({
  imports: [HttpClientModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: CustomHttpService,
          useFactory: customHttpFactory,
          deps: [HttpClient, Router, ActivatedRoute]
        },
        APIRestFulService,
        AuthService,
        AuthGuard,
        LodingSpinnerService
      ]
    };
  }
}
