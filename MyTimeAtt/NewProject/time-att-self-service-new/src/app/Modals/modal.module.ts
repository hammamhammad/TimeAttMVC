import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal';
import { ModalHeaderComponent } from './modal-header';
import { ModalBodyComponent } from './modal-body';
import { ModalFooterComponent } from './modal-footer';
import { AutofocusDirective } from './autofocus';
import {AlertMsgComponent,AlertAutofocusDirective} from './alert.component';
import { SafeHtmlPipe } from '../shared/safehtml.pipe';
export * from './modal';
export * from './modal-header';
export * from './modal-body';
export * from './modal-footer';
export * from './modal-instance';
export * from './alert.component';

@NgModule({
  imports: [
    CommonModule
    // , ConfirmationPopoverModule.forRoot({
    //   confirmButtonType: 'danger' // set defaults here
    // })
  ],
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    AutofocusDirective,
    AlertMsgComponent,AlertAutofocusDirective,SafeHtmlPipe
  ],
  exports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    AutofocusDirective,
    AlertMsgComponent,AlertAutofocusDirective,
    //ConfirmationPopoverModule,SafeHtmlPipe
    
  ]
})
export class ModalModule {
}
