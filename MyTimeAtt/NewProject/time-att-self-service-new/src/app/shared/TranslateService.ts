import { Injectable } from '@angular/core';
import { AppSettings } from './global.settings';
import { TranslateLoader } from './TranslateLoader';
@Injectable()
export class TranslateService {
  private pending: any;
  constructor(private _TranslateLoader: TranslateLoader) { }
  public setTranslate() {
    console.log("getTranslation")
    return this._TranslateLoader.getTranslation();
  }
  public getValue(key:string): string {
    if (AppSettings.resourceBundle) {
      let value = AppSettings.resourceBundle[key];
      if (!value || value === undefined)
        return key && key.length > 0 ? '[Missing Translate]' : '';
      else
        return value;
    } else
      return '[Waiting Translate]';


  }


}
