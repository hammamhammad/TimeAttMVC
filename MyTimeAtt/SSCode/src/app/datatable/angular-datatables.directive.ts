/// <reference types="datatables.net" />
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
 */

import { Directive, ElementRef, Input, Output, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Directive({
  selector: '[datatable]',
  exportAs: 'datatable'
})
export class DataTableDirective implements OnInit, OnDestroy {


  /**
   * The DataTable option you pass to configure your table.
   */
  @Input()
  dtOptions: DataTables.Settings = {};

  /**
   * This trigger is used if one wants to trigger manually the DT rendering
   * Useful when rendering angular rendered DOM
   */
  @Input()
  dtTrigger: Subject<any>;
  @Input()
  withPaging: boolean;

  @Output()
  onPageChange: EventEmitter<any> = new EventEmitter();
  /**
   * The DataTable instance built by the jQuery library [DataTables](datatables.net).
   *
   * It's possible to execute the [DataTables APIs](https://datatables.net/reference/api/) with
   * this variable.
   */
  dtInstance: Promise<DataTables.Api>;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.dtTrigger) {
      this.dtTrigger.subscribe(() => {
        this.displayTable();
      });
    } else {
      this.displayTable();
    }
  }
  selectRow(row) {
    let table = $(this.el.nativeElement).DataTable();
    if ($(row).hasClass('selected')) {
      $(row).removeClass('selected');
    }
    else {
      table.$('tr.selected').removeClass('selected');
      $(row).addClass('selected');
    }
  }
  unSelectRows() {
    let table = $(this.el.nativeElement).DataTable();
    table.$('tr.selected').removeClass('selected');
  }
  show(select) {
    $(this.el.nativeElement).DataTable().row().show(select)
  }
  showRow(id, select) {
    $(this.el.nativeElement).DataTable().row().showRow(id, select)
  }
  updateRow(id, data, select) {
    $(this.el.nativeElement).DataTable().row().updateRow(id, data, select);
  }
  addRow(data, select) {
    $(this.el.nativeElement).DataTable().row().addRow(data, select);
  }
  getRow(id) {
    $(this.el.nativeElement).DataTable().row().getRow(id);
  }
  deleteRow(id) {
    $(this.el.nativeElement).DataTable().row().deleteRow(id);
  }
  Exists(id) {
    $(this.el.nativeElement).DataTable().row().Exists(id);
  }
  drawRow(id) {
    $(this.el.nativeElement).DataTable().row().drawRow(id);
  }
  setData(data) {
    this.dtOptions.data = data;
  }
  private displayTable(): void {

    this.dtInstance = new Promise((resolve, reject) => {
      Promise.resolve(this.dtOptions).then(dtOptions => {
        // Using setTimeout as a "hack" to be "part" of NgZone
        setTimeout(() => {
          const dt = $(this.el.nativeElement).DataTable(dtOptions);
          if (this.withPaging) {
            dt.on('page.dt', function () {
              let info = dt.page.info();
              this.onPageChange.emit(info);
            }.bind(this));
          }
          resolve(dt);
        });
      });
    });
  }
  ngOnDestroy(): void {
    if (this.dtInstance) {
      this.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.rows().clear();
        dtInstance.destroy(true);
        this.dtInstance = null;
      });
    }
  }
}
