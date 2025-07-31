import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Injectable} from '@angular/core';
@Injectable()
export class LodingSpinnerService {
constructor(private spinnerService: Ng4LoadingSpinnerService) { }
public show(){
    this.spinnerService.show();
}
public hide(){
    this.spinnerService.hide();
}
}
