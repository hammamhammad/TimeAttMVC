import { 
  Component, ComponentFactoryResolver, ViewChild, 
  ViewContainerRef, ViewEncapsulation, ComponentRef, 
  EventEmitter, Input, Output, OnDestroy, Injector, Type 
} from '@angular/core';
import { Directive, ElementRef, Optional } from '@angular/core';
import { AppSettings } from '../shared/global.settings';
import { ModalComponent } from './modal';

@Component({
  selector: 'alertmsg',
  template: `
  <modal #modal cssClass="{{cssModaldialog}}" 
  cssmodalClass="{{cssModal}}" id="{{modalID}}" 
  backdrop="{{backdropModal}}" (onClose)="closed()" 
  (onDismiss)="dismissed()" (onOpen)="opened()" class="{{(isEnglish?'formEN':'')}}">
    <modal-header>
     <button *ngIf="showClose" type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="modal.dismiss()">
                <span aria-hidden="true">&times;</span>
            </button>
        <h4 *ngIf="modalHeader" class="modal-title">{{modalTitle}}</h4>
    </modal-header>
    <modal-body>
    
         <div *ngIf="modalMessage" [innerHTML]="message | safeHtml">
        </div>
          <div #child>
          </div>
    
    </modal-body>
    <modal-footer *ngIf="modalFooter">
        <button *ngIf="cancelButton" type="button"
         class="btn btn-default" data-dismiss="modal"
          (click)="modal.dismiss()">{{cancelButtonText}}
          </button>
        <button *ngIf="okButton" type="button" class="btn btn-primary" (click)="modal.close()">{{okButtonText}}</button>
    </modal-footer>
</modal>
`, // Your template here
  encapsulation: ViewEncapsulation.None
})

/**
  * API to an open modal window.
  */
export class AlertMsgComponent implements OnDestroy {
  @ViewChild('modal', { static: true }) modal!: ModalComponent;
  @ViewChild('child', { read: ViewContainerRef, static: true }) target!: ViewContainerRef;
  cmpRef!: ComponentRef<any>|null;

  // Constructor and other methods remain largely unchanged

  setComponentData(data: { component: Type<any>; inputs: any }|null) {
    if (!data) {
      return;
    }

    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    const injector = Injector.create({
      providers: Object.keys(data.inputs).map(key => ({ provide: key, useValue: data.inputs[key] })),
      parent: this.target.injector
    });

    const componentFactory = this.resolver.resolveComponentFactory(data.component);
    this.cmpRef = this.target.createComponent(componentFactory, 0, injector);
   }
   isShown: Boolean = false;
  @Input() public modalID!: string;
  @Input('show-close') showClose: boolean = false;
  @ViewChild('modal')
  get isEnglish(): boolean {
    return AppSettings.CurrentLang !== 'ar';
  }
  /**
     * Caption for the title.
     */
  @Input() public modalTitle!: string;
  /**
    * component which is to be loaded dynamically.
    */
  @Input() public component: any;
  /**
     * Describes if the modal contains Ok Button.
     * The default Ok button will close the modal and emit the callback.
     * Defaults to true.
     */
  @Input() public okButton: boolean = true;
  /**
     * Caption for the OK button.
     * Default: Ok
     */
  @Input() public okButtonText: string = 'Ok';
  /**
     * Describes if the modal contains cancel Button.
     * The default Cancelbutton will close the modal.
     * Defaults to true.
     */
  @Input() public cancelButton: boolean = true;
  /**
     * Caption for the Cancel button.
     * Default: Cancel
     */
  @Input() public cancelButtonText: string = 'Cancel';
  /**
     * if the modalMessage is true it will show the message inside modal body.
     */
  @Input() public modalMessage: boolean = true;
  /**
     * Some message/content can be set in message which will be shown in modal body.
     */
  @Input() public message!: string;
  /**
    * if the value is true modal footer will be visible or else it will be hidden.
    */
  @Input() public modalFooter: boolean = true;
  /**
    * shows modal header if the value is true.
    */
  @Input() public modalHeader: boolean = true;
  /**
    * if the value is true modal will be visible or else it will be hidden.
    */


  @Input() public cssModaldialog: string = '';
  @Input() public cssModal: string = 'fade';
  @Input() public backdropModal= 'static';
  @Input() public actionName: any;
  @Input() public refID!: string | number;
  public ExtraData: any;
  /**
    * Emitted when a ok button was clicked
    * or when close method is called.
    */


  @Output() onClose: EventEmitter<any> = new EventEmitter(false);
  @Output() onDismissed: EventEmitter<any> = new EventEmitter(false);
  @Output() onOpened: EventEmitter<any> = new EventEmitter(false);
  constructor(public compiler: ComponentFactoryResolver
    , public viewContainer: ViewContainerRef
    , private resolver: ComponentFactoryResolver) {
  }
  /**
       * Opens a modal window creating backdrop.
       * @param component The angular Component that is to be loaded dynamically(optional).
       */
  open(size: string) {
    // this.isOpen = true;
    if (this.cmpRef) {
      this.cmpRef.destroy();
      this.cmpRef = null;
    }
    this.modal.open(size, this.backdropModal);
  }
  // setComponentData(data: { component: any|null, inputs: any|null }|null|undefined) {
  //   if (!data) {
  //     return;
  //   }
    // We can destroy the old component is we like by calling destroy
    // if (this.cmpRef) {
    //   this.cmpRef.destroy();
    // }



    // Need Reading
    // Inputs need to be in the following format to be resolved properly
    // let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
    // let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

    // // We create an injector out of the data we want to pass down and this components injector
    // let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.target.parentInjector);

    // // We create a factory out of the component we want to create
    // let factory = this.resolver.resolveComponentFactory(data.component);

    // We create the component using the factory and the injector
    // let component = factory.create(injector);

    // // We insert the component into the dom container
    // this.target.insert(component.hostView);


   // this.cmpRef = component;

  //}
  openDynamic(data: { component: any, inputs: any }|null, size: string) {
    this.setComponentData(data);
    this.modal.open(size, this.backdropModal);
  }
  close() {
    this.modal.close();
  }
  /**
     *  close method dispose the component, closes the modal and optionally emits modalOutput value.
     */
  opened() {
    this.onOpened.emit({ actionName: this.actionName, refID: this.refID, arg: null });
    this.isShown = true;
  }
  closed() {
    let data;
    if (this.ExtraData) {

      data = { actionName: this.actionName, refID: this.refID, arg: this.ExtraData };
    }
    else if (this.cmpRef && !!this.cmpRef.instance.data) {
      data = { actionName: this.actionName, refID: this.refID, arg: this.cmpRef.instance.data };
    }
    else {
      data = { actionName: this.actionName, refID: this.refID, arg: null };
    }
    this.dispose();
    this.onClose.emit(data);
    this.isShown = false;
  }
  /**
     *  ok method dispose the component, closes the modal and emits true.
     */
  dismissed() {
    this.dispose();
    this.onDismissed.emit({ actionName: this.actionName, refID: this.refID, arg: null });
    this.isShown = false;
  }
  /**
     *  dispose method dispose the loaded component.
     */
  dispose() {

    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
  ngOnDestroy() {
    this.dispose();
  }

}



@Directive({
    selector: '[autofocus-alert]'
})
export class AlertAutofocusDirective {
    constructor(private el: ElementRef, @Optional() private modal: ModalComponent) {
        if (modal) {
            this.modal.onOpen.subscribe(() => {
                this.el.nativeElement.focus();
            });
        }
    }
}

