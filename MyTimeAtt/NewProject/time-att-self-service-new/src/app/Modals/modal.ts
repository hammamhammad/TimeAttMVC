import { Component, OnDestroy, Input, Output, EventEmitter, Compiler, ElementRef, HostBinding, NgModule, ViewContainerRef, ViewChild } from '@angular/core';
import { ModalInstance, ModalResult } from './modal-instance';

@Component({
  selector: 'modal',
  host: {
    'class': 'modal',
    'role': 'dialog',
    'tabindex': '-1'
  },
  template: `
  < <div class="vertical-alignment-helper">
        <div class="modal-dialog vertical-align-center" [ngClass]="getCssClasses()">
            <div class="modal-content">
                <ng-content></ng-content>
            </div>
        </div>
        </div>
    `
})
export class ModalComponent implements OnDestroy {

  private overrideSize?: string = '';

  instance: ModalInstance;
  visible: boolean = false;
  @Input() ModalID: string = 'myModal';
  @Input() animation: boolean = true;
  @Input() backdrop = 'static';
  @Input() keyboard: boolean = true;
  @Input() size!: string;
  @Input() cssClass: string = '';
  @Input() cssmodalClass: string = '';
  @Output() onClose: EventEmitter<any> = new EventEmitter(false);
  @Output() onDismiss: EventEmitter<any> = new EventEmitter(false);
  @Output() onOpen: EventEmitter<any> = new EventEmitter(false);
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
  @HostBinding('class') get modalClass(): string {
    return 'modal ' + this.cssmodalClass;
  }
  @HostBinding('class.fade') get fadeClass(): boolean {
    return this.animation;
  }

  @HostBinding('attr.data-keyboard') get dataKeyboardAttr(): boolean {
    return this.keyboard;
  }
  @HostBinding('attr.id') get idAttr(): string {
    return this.ModalID;
  }

  @HostBinding('attr.data-backdrop') get dataBackdropAttr(): string | boolean {
    return this.backdrop;
  }


  constructor(private compiler: Compiler, private element: ElementRef) {
    this.instance = new ModalInstance(this.element);

    this.instance.hidden.subscribe((result) => {
      this.visible = this.instance.visible;
      if (result === ModalResult.Dismiss) {
        this.onDismiss.emit(undefined);
      }
    });

    this.instance.shown.subscribe(() => {
      this.onOpen.emit(undefined);
    });
  }

  ngOnDestroy() {
    return this.instance && this.instance.destroy();
  }

  routerCanDeactivate(): any {
    return this.ngOnDestroy();
  }

  open(size: string, backdrop: string ): Promise<void> {
    if (ModalSize.validSize(size)) { this.overrideSize = size; this.backdrop = backdrop;  }

    return this.instance.open().then(() => {
      this.visible = this.instance.visible;
    });
  }

  close(value?: any): Promise<void> {
    return this.instance.close().then(() => {
      this.onClose.emit(value);
    });
  }

  dismiss(): Promise<void> {
    return this.instance.dismiss();
  }

  getCssClasses(): string {
    let classes: string[] = [];

    if (this.isSmall()) {
      classes.push('modal-sm');
    }

    if (this.isLarge()) {
      classes.push('modal-lg');
    }

    if (this.isMedum()) {
      classes.push('modal-md');
    }

    if (this.cssClass !== '') {
      classes.push(this.cssClass);
    }

    return classes.join(' ');
  }

  private isSmall() {
    return this.overrideSize !== ModalSize.Large && this.overrideSize !== ModalSize.Medum
      && this.size === ModalSize.Small
      || this.overrideSize === ModalSize.Small;
  }

  private isLarge() {
    return this.overrideSize !== ModalSize.Small && this.overrideSize !== ModalSize.Medum
      && this.size === ModalSize.Large
      || this.overrideSize === ModalSize.Large;
  }
  private isMedum() {
    return this.overrideSize !== ModalSize.Small && this.overrideSize !== ModalSize.Large
      && this.size === ModalSize.Medum
      || this.overrideSize === ModalSize.Medum;
  }
  // private addComponent(template: string) {
  //   @Component({ template: template })
  //   class TemplateComponent { }

  //   @NgModule({ declarations: [TemplateComponent] })
  //   class TemplateModule { }

  //   const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
  //   const factory = mod.componentFactories.find((comp) =>
  //     comp.componentType === TemplateComponent
  //   );
  //   //Important
  //   //const component = this.container.createComponent(factory);
  // }
}

export class ModalSize {
  static Small = 'sm';
  static Large = 'lg';
  static Medum = 'md';

  static validSize(size: string) {
    return size && (size === ModalSize.Small || size === ModalSize.Large || size === ModalSize.Medum);
  }
}
