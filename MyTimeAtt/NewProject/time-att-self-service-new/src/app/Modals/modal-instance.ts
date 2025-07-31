import { ElementRef, AfterViewInit, Injectable } from '@angular/core';
import { Observable, fromEvent, map } from 'rxjs';

declare var jQuery: any;
@Injectable({
  providedIn: 'root' // or you could use 'any' or specific module
})
export class ModalInstance implements AfterViewInit {

  private suffix: string = '.ng2-bs3-modal';
  private shownEventName: string = 'shown.bs.modal' + this.suffix;
  private hiddenEventName: string = 'hidden.bs.modal' + this.suffix;
  private $modal: any;

  shown!: Observable<void>;
  hidden!: Observable<ModalResult>;
  result: any;
  visible: boolean = false;

  constructor(private element: ElementRef) {
 this.init();
  }
  ngAfterViewInit() {
   
  }
  open(): Promise<any> {
    this.init() ;
    return this.show();
  }

  close(): Promise<any> {
    this.result = ModalResult.Close;
    return this.hide();
  }

  dismiss(): Promise<any> {
    this.result = ModalResult.Dismiss;
    return this.hide();
  }

  destroy(): Promise<any> {
    return this.hide().then(() => {
      if (this.$modal) {
        this.$modal.data('bs.modal', null);
        this.$modal.remove();
      }
    });
  }

  private show() {
    let promise = toPromise(this.shown);
    this.resetData();
    this.$modal.modal();
    return promise;
  }

  private hide(): Promise<ModalResult> {
    if (this.$modal && this.visible) {
      let promise = toPromise(this.hidden);
      this.$modal.modal('hide');
      return promise;
    }
    return Promise.resolve(this.result);
  }

  init() {
    this.$modal = jQuery(this.element.nativeElement);
    this.$modal.appendTo('body');
    // this.$modal.bind(this.hiddenEventName, function () {
    //   jQuery('html').css('margin-right', '0px');
    // });
    // this.$modal.bind(this.shownEventName, function () {
    //   jQuery('html').css('margin-right', '-15px');
    // });
    this.shown = fromEvent(this.$modal, this.shownEventName).pipe(
      map(() => {
        this.visible = true;
      })
    );
    
    this.hidden = fromEvent(this.$modal, this.hiddenEventName).pipe(
      map(() => {
        let result = (!this.result || this.result === ModalResult.None) ? ModalResult.Dismiss : this.result;
    
        this.result = ModalResult.None;
        this.visible = false;
        return result;
      })
    );
  }

  private resetData() {
    this.$modal.removeData();
    this.$modal.data('backdrop', booleanOrValue(this.$modal.attr('data-backdrop')));
    this.$modal.data('keyboard', booleanOrValue(this.$modal.attr('data-keyboard')));
  }
}

function booleanOrValue(value: string) {
  if (value === 'true')
    return true;
  else if (value === 'false')
    return false;
  return value;
}

function toPromise<T>(observable: Observable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    observable.subscribe(next => {
      resolve(next);
    });
  });
}

export enum ModalResult {
  None,
  Close,
  Dismiss
}
