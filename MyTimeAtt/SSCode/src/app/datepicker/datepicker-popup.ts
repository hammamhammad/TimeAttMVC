import {
  Component, AfterViewInit, EventEmitter,
  Output, Input, ViewEncapsulation, forwardRef, OnInit, OnDestroy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl } from '@angular/forms';
declare var jQuery: any;
import { AppSettings } from '../shared/global.settings';
import * as moment_ from 'moment';

const moment: any = (<any>moment_).default || moment_;
export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PopupDatepickerComponent),
  multi: true
};
export const CALENDAR_VALUE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PopupDatepickerComponent),
  multi: true
};
@Component({
  selector: 'datepicker-popup',
  template: `
    <div class="input-group date" [attr.id]="'div_'+ dpID">
       <input type="text" class="form-control" [attr.id]="dpID" [disabled]="disabled" />
       <span (click)="clear()" *ngIf="allowClear && !disabled" class="input-group-addon"><i class="glyphicon glyphicon-remove"></i> </span>
       <span  class="input-group-addon" (click)="show()">
            <i class="glyphicon glyphicon-th">
            </i>
       </span>
    </div>`,
  encapsulation: ViewEncapsulation.None,
  providers: [CALENDAR_VALUE_ACCESSOR, CALENDAR_VALUE_VALIDATOR]
})

export class PopupDatepickerComponent implements AfterViewInit, ControlValueAccessor, OnInit, OnDestroy {
  public dpID: string;
  @Output() dateSelected: EventEmitter<any> = new EventEmitter();
  @Input() public format: string = 'yyyy-mm-dd';
  @Input() public momentFormat: string = 'YYYY-MM-DD';
  @Input() public container: string = "";
  @Input() disabled = false;
  @Input() allowClear = false;
  private viewDate: string = '';
  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };
  validateFn: any = () => { };
  // implements functions
  validate(c: FormControl) {
    return this.validateFn(c);
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
  writeValue(value: any) {
    if (!value) { value = ''; }

    this.viewDate = value;
    let datepickerElement = jQuery('#' + this.dpID).val(this.viewDate);
    this.onChangeCallback(value);
    datepickerElement.val(this.viewDate);
    //   if (this.viewDate) {
    datepickerElement.datepicker('update', this.viewDate);

    //}
  }
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  genratedynamicKey() {
    this.dpID = 'dp_' + (Math.floor((Math.random() * 100000) + 1)).toString();
    return this.dpID;
  }
  // Properties
  get value(): any {
    return this.viewDate;
  }
  set value(value: any) {
    let date = (value instanceof moment) ? value : moment(value, this.momentFormat);
    this.viewDate = date.format(this.momentFormat);
    this.onChangeCallback(value);
    let datepickerElement = jQuery('#' + this.dpID).val(this.viewDate);
    // datepickerElement.datepicker('update', this.viewDate);

  }
  constructor() {
    this.genratedynamicKey();
  }

  ngOnInit() {

  }
  ngOnDestroy() {
    let datepickerElement = jQuery('#' + this.dpID);
    datepickerElement.datepicker('destroy');
    datepickerElement.datepicker('remove');

  }
  initCalendar() {
    let lang = AppSettings.CurrentLang;
    //this.translate.get('Language').subscribe((res: string) => {
    //  lang = res;
    let datepickerElement = jQuery('#' + this.dpID);

    datepickerElement.prop('readonly', true);
    datepickerElement.datepicker({
      language: lang,
      autoclose: true,
      todayHighlight: true,
      toggleActive: true,
      orientation: 'auto',
      format: this.format,
      todayBtn: true,
      container: (this.container.length === 0 ? '#div_' + this.dpID : this.container) //'#div_' + this.dpID
    });
    datepickerElement.on('changeDate', e => {
      if (e.date === undefined) {
        e.target.value = this.viewDate;
        e.date = new Date(this.viewDate);
        datepickerElement.datepicker('update', this.viewDate);

      }
      let date = (e.date instanceof moment) ? e.date : moment(e.date, this.momentFormat);
      this.viewDate = date.format(this.momentFormat);
      this.value = this.viewDate;
      this.dateSelected.emit(this.viewDate);
    });
    datepickerElement.on('hide', e => {
      this.onTouchedCallback();
    });

    // });
  }
  clear() {
    this.writeValue(null);
     this.dateSelected.emit(this.viewDate);
  }
  show() {
    if (this.disabled)
      return;
    let datepickerElement = jQuery('#' + this.dpID);
    datepickerElement.datepicker('show');

  }
  setMinDate(value: string) {

    let datepickerElement = jQuery('#' + this.dpID);
    datepickerElement.datepicker('setStartDate', value);
  }
  setMaxDate(value: string) {

    let datepickerElement = jQuery('#' + this.dpID);
    datepickerElement.datepicker('setEndDate', value);
  }

  ngAfterViewInit(): void {
    if (this.dpID !== undefined) {
      this.initCalendar();
    }
  }
}

