import { Injectable } from '@angular/core';
import { AppSettings } from './global.settings';
import { APIRestFulService } from './apiRestful.service';
@Injectable()
export class TranslateLoader {


  constructor(private dataService: APIRestFulService) {
  }
  public getTranslation() {
    let WebApiUrl = AppSettings.ResourceUrl;
   return this.dataService.getRequestAS(WebApiUrl);
  }
}
