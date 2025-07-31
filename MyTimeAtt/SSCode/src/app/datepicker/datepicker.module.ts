import { NgModule } from '@angular/core';
import { PopupDatepickerComponent } from './datepicker-popup';
import { CommonModule } from '@angular/common';
export * from './datepicker-popup';

@NgModule({
    declarations: [PopupDatepickerComponent],
    entryComponents: [PopupDatepickerComponent],
    imports:[CommonModule],
    exports: [PopupDatepickerComponent]
})
export class PopupDatepickerModule { }
