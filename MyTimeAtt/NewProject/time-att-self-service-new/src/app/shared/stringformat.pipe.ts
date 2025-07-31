
import { Pipe, PipeTransform } from '@angular/core';
import { AppSettings } from './global.settings';

@Pipe({
    name: 'formatstring',
    pure: false
})
export class StringFormatPipe implements PipeTransform {




    constructor() {

    }

    transform(value: string, args: any): any {
        if (typeof args === 'string')
            args = [args];
       
        return value.stringFormat(args);
    }
}
