import {
    AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy,
    Output, SimpleChanges, ViewChild, ViewEncapsulation, OnInit, NgZone,forwardRef, Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Select2OptionData } from './ng2-select2.interface';

@Component({
    selector: 'select2',
    template: `
        <select #selector>
            <ng-content select="option, optgroup">
            </ng-content>
        </select>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select2Component),
      multi: true,
    }
  ]
})
export class Select2Component implements AfterViewInit, OnChanges, OnDestroy, OnInit, ControlValueAccessor {
    @ViewChild('selector') selector!: ElementRef;

    // data for select2 drop down
    @Input() data!: Array<Select2OptionData>;

    // value for placeholder
    @Input() placeholder = '';
    // value for allowClear
    @Input() allowClear = false;

    // value for select2
    @Input() value: string | string[]='';

    // enable / disable default style for select2
    @Input() cssImport = false;

    // width of select2 input
    @Input() width!: string;

    // enable / disable select2
    @Input() disabled = false;

    // all additional options
    @Input() options: Select2Options | undefined;

    // emitter when value is changed
    @Output() valueChanged = new EventEmitter();

    private element: any = undefined;
    private check = false;
    private style = `CSS`;

    constructor(private renderer: Renderer2, public zone: NgZone, public _element: ElementRef) {
    }

    ngDoCheck() {
        if (!this.element) {
            return;
        }
    }

    ngOnInit() {
        if (this.cssImport) {
            const head = this._element.nativeElement.ownerDocument.head;
            let link = head.lastChild;
      
            if (link && !link.version) { // You might need to adjust this check depending on what you're trying to achieve
              const newLink = this.renderer.createElement('style');
              this.renderer.setAttribute(newLink, 'type', 'text/css');
              this.renderer.setAttribute(newLink, 'version', 'select2');
              // Use `setProperty` for setting properties like `innerText` (which isn't exactly an attribute or property that should be used with `setAttribute`).
              this.renderer.setProperty(newLink, 'innerText', this.style);
      
              this.renderer.appendChild(head, newLink);
            }}
        // if (this.cssImport) {
        //     const head = document.getElementsByTagName('head')[0];
        //     const link: any = head.children[head.children.length - 1];

        //     if (!link.version) {
        //         const newLink = this.renderer.createElement(head, 'style');
        //         this.renderer.setElementProperty(newLink, 'type', 'text/css');
        //         this.renderer.setElementProperty(newLink, 'version', 'select2');
        //         this.renderer.setElementProperty(newLink, 'innerHTML', this.style);
        //     }
        // }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.element) {
            return;
        }
        if (changes['data'] && JSON.stringify(changes['data'].previousValue) !== JSON.stringify(changes['data'].currentValue)) {
            this.initPlugin();

            const newValue: string = this.element.val();
            this.valueChanged.emit({
                value: newValue,
                data: this.element.select2('data')
            });
            this.propagateChange(newValue);
        }
        if (changes['value'] && changes['value'].previousValue !== changes['value'].currentValue) {

            console.log('value changed.. ');

            const newValue: string = changes['value'].currentValue;

            this.setElementValue(newValue);
            this.valueChanged.emit({
                value: newValue,
                data: this.element.select2('data')
            });
            this.propagateChange(newValue);
        }
        if (changes['disabled'] && changes['disabled'].previousValue !== changes['disabled'].currentValue) {
            this.renderer.setAttribute(this.selector.nativeElement, 'disabled', this.disabled.toString());
        }
        if (changes['placeholder'] && changes['placeholder'].previousValue !== changes['placeholder'].currentValue) {
            this.renderer.setAttribute(this.selector.nativeElement, 'data-placeholder', this.placeholder);
        }
        if (changes['allowClear'] && changes['allowClear'].previousValue !== changes['allowClear'].currentValue) {
            this.renderer.setAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        }
    }

    ngAfterViewInit() {
        this.element = jQuery(this.selector.nativeElement);
        this.renderer.setAttribute(this.selector.nativeElement, 'data-placeholder', this.placeholder);
        this.renderer.setAttribute(this.selector.nativeElement, 'data-allow-clear', this.allowClear.toString());
        // console.log(this.selector.nativeElement);

        this.initPlugin();

        if (typeof this.value !== 'undefined') {
            this.setElementValue(this.value);
        }
        this.element.on('select2:open', (e: any) => {
           
            this._onTouched();
        }
        );
        this.element.on('select2:select select2:unselect', (e: any) => {

            const newValue = this.element.val(); //: string = (e.type === 'select2:unselect') ? '' : this.element.val();

            //  console.log(newValue);
            this.valueChanged.emit({
                value: newValue,
                data: this.element.select2('data')
            });
            this.propagateChange(newValue);
            this._onTouched();
            this.setElementValue(newValue);
        });
    }

    ngOnDestroy() {
        this.element.off('select2:select');
    }

    private initPlugin() {
        if (!this.element.select2) {
            if (!this.check) {
                this.check = true;
                console.log('Please add Select2 library (js file) to the project. You can download it from https://github.com/select2/select2/tree/master/dist/js.');
            }

            return;
        }

        // If select2 already initialized remove him and remove all tags inside
        if (this.element.hasClass('select2-hidden-accessible') === true) {
            this.element.select2('destroy');
            this.renderer.setAttribute(this.selector.nativeElement, 'innerHTML', '');
        }

        const options: Select2Options = {
            data: this.data,
            width: (this.width) ? this.width : 'resolve'
        };
        // this.options.placeholder = '::SELECT::';
        Object.assign(options, this.options);
        if (options.matcher) {
            jQuery.fn.select2.amd.require(['select2/compat/matcher'], (oldMatcher: any) => {
                options.matcher = oldMatcher(options.matcher);
                this.element.select2(options);

                if (typeof this.value !== 'undefined') {
                    this.setElementValue(this.value);
                }
            });
        } else {
            // console.log(options);
            this.element.select2(options);
        }
        if (this.disabled) {
            //  console.log(this.renderer);
            this.renderer.setAttribute(this.selector.nativeElement, 'disabled', this.disabled.toString());
        }
    }
    setValue(value: any) {
        this.propagateChange(value);
        this._onTouched();
        this.setElementValue(value);
        this.element.trigger('change.select2');
    }
    private setElementValue(newValue: string | string[]) {
        this.zone.run(() => {
            if (Array.isArray(newValue)) {
                for (const option of this.selector.nativeElement.options) {
                    if (newValue.indexOf(option.value) > -1) {
                        this.renderer.setAttribute(option, 'selected', 'true');
                    }
                }
            } else {
                this.renderer.setAttribute(this.selector.nativeElement, 'value', newValue);
            }
            this.element.trigger('change.select2');
        });
    }


    writeValue(value: any) {

        if (value !== undefined) {
            this.value = value;
            this.setElementValue(value);
        }
    }

    propagateChange = (value: any) => { };
    private _onTouched = () => { };
    registerOnChange(fn: any) {
        this.propagateChange = fn;
        // this.valueChanged.subscribe(fn);
    }

    public registerOnTouched(fn: () => void): void { this._onTouched = fn; }
}