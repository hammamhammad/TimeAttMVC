
import { Pipe, PipeTransform } from '@angular/core';
import { AppSettings } from './global.settings';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {




  constructor() {

  }

  transform(value: string, args: string[]): any {

    if (AppSettings.resourceBundle) {
      let d = AppSettings.resourceBundle[value];
      if (!d || d === undefined)
        return value && value.length > 0 ? '[Missing Translate]' : '';
      else
        return d;
    } else
      return '[Waiting Translate]'

  }
}
