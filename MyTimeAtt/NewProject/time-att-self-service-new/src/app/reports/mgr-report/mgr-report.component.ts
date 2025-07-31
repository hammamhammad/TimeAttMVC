import { EmpTransDetailsComponent } from './../emp-trans-details/emp-trans-details.component';
import { MonthTransViewComponent } from './../month-trans-view/month-trans-view.component';

import { DataTableDirective } from './../../datatable/angular-datatables.directive';
import { AppSettings } from './../../shared/global.settings';
import { AlertMsgComponent } from './../../Modals/alert.component';
import { AuthService } from './../../shared/auth.service';
import { TranslateService } from './../../shared/TranslateService';
import { Router } from '@angular/router';
import { APIRestFulService } from './../../shared/apiRestful.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LodingSpinnerService } from '../../shared/loadingspinner.service';
import { Observable, ReplaySubject, Subject, Subscription, finalize, map, startWith, switchMap, take, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';


//import { Select2Component } from '../../select2/ng2-select2';

@Component({
  selector: 'MgrAttReport',
  templateUrl: './mgr-report.component.html',
  styleUrls: ['./mgr-report.component.css']
})
export class MgrReportComponent implements OnInit, AfterViewInit {


  constructor(private api: APIRestFulService, private router: Router,
    private authService: AuthService, private translate: TranslateService, private spinner: LodingSpinnerService) { }

  busy!: Subscription;
  message!: string;
  @ViewChild('alert') alert!: AlertMsgComponent;
  localEmp!: { emp_id: number };
  //@ViewChild('select2Group') select2Group: Select2Component;
  Select2OptionsGroup?: Select2Options;
  localEmployeedata: Array<IdTextPair> |null=null ;
  employeesListData!: any[];
  empDailyList: any;
  empMonthlyList: any;
  reportType = '1';
  mgrReportForm = { fdate: 0, tdate: 0, fdateF: '', tdateF: '' }

  @ViewChild('MGRTimeSheetSummaryTable') MGRTimeSheetSummaryTable!: DataTableDirective;
  dtOptionsSummaryTable: DataTables.Settings = {};
  dtTriggerSummaryTable: Subject<any> = new Subject();
  isRenderSummaryTable = false;


  @ViewChild('TimeSheetForManagerTableMonthlySummaryTable') TimeSheetForManagerTableMonthlySummaryTable!: DataTableDirective;
  dtOptionsMonthlyTable: DataTables.Settings = {};
  dtTriggerMonthlyTable: Subject<any> = new Subject();
  isRenderMonthlyTable = false;

  getEmployeesData(employees: Array<any>): Array<any> {
    let data: Array<any> = new Array<any>();
    if (AppSettings.CurrentLang == 'ar') {
      employees.forEach(element => {
        data.push({ id: element.emp_id, text: element.emp_name });
      });
    }
    else {
      employees.forEach(element => {
        data.push({ id: element.emp_id, text: element.emp_nameEn });
      });
    }
    this.localEmployeedata = data;
    return data;



  }
  changeVal($event : any)
  {
    this.localEmp.emp_id = +(($event.target as HTMLSelectElement).value)
  }
  ngOnInit() {
    this.localEmployeedata = null;
    this.localEmp = { emp_id: 0 };
    this.Select2OptionsGroup = {

      language: (AppSettings.CurrentLang == 'ar') ? 'ar' : 'en',
      dir: (AppSettings.CurrentLang == 'ar') ? 'rtl' : 'ltr',
      selectOnClose: false,
      closeOnSelect: true,
      width: '100%',
      placeholder: "Select a value",
      tags: false,
      multiple: true,
      maximumSelectionLength: 1,
      allowClear: true,
      dropdownParent: jQuery('body'),

    };
    let today = new Date();
    let dd = today.getDate().toString();
    let mm = (today.getMonth() + 1).toString(); //January is 0!
    let yyyy = today.getFullYear().toString();
    if (parseInt(dd) < 10) {
      dd = '0' + dd
    }
    if (parseInt(mm) < 10) {
      mm = '0' + mm
    }
    this.mgrReportForm.fdateF = yyyy + '-' + mm + '-' + dd;
    this.mgrReportForm.tdateF = yyyy + '-' + mm + '-' + dd;
    this.EmployeeCtrl.setValue("");
    // this.filteredEmployees.next([]);
    this.filteredEmployees = this.EmployeeCtrl.valueChanges.pipe(
      startWith(''),
      map(filter => {
        const lowerCaseFilter = filter.toLowerCase();
        console.log(filter)
        return filter === '' 
          ? this.localEmployeedata! 
          : this.localEmployeedata!.filter(v => 
              v.text.toLowerCase().includes(lowerCaseFilter) || 
              v.id.toString().includes(lowerCaseFilter)
            )!;
      })
    );
    // this.EmployeeFilterCtrl.valueChanges
    //   .pipe()
    //   .subscribe(() => {
    //     console.log(this.EmployeeFilterCtrl)
    //     this.filterEmployees();
    //   });


  }
  returnRowColor(row: { vac_id: number; TotalLate: string; ActualTime: string; timefin: string; timefout: string; }) {
    if (row.vac_id > 0) //اجازة
     // return '#c2f1b7';
     return 'vacColor'

    if (row.TotalLate != '--:--') //التأخير
      //return '#ffcf9e';
      return 'latColor'

    if (row.ActualTime != '00:00' && row.timefin == '--:--' && row.timefout == '--:--') //الغياب
      //return '#f2dede';
      return 'absColor'

    if (row.timefin != '--:--' && row.timefout == '--:--') //نسيان بصمة
      //return '#fff7c0';
      return 'notcomColor'

    if (row.ActualTime == '00:00') //اجازة رسمية
      //return '#e8e8e8';
      return 'offColor'
return;
  }
  ngAfterViewInit() {
    this.dtOptionsSummaryTable = {
      pagingType: 'full_numbers',
      lengthMenu: [[30, 50, 100], [30, 50, 100]],
      rowId: 'user_id',
      dom: `<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>t<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>`,
      language: AppSettings.DataTableLanguage,
      searching: true,
      info: true,
      autoWidth: false,
      ordering: true,

    }


    this.dtOptionsMonthlyTable = {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
      rowId: 'user_id',
      dom: `<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>t<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>`,
      language: AppSettings.DataTableLanguage,
      searching: true,
      info: true,
      autoWidth: false,
      ordering: true,
    }

    setTimeout( () => {
      this.dtTriggerSummaryTable.next("");
      this.getEmployees();
    }, 300);

    setTimeout( () => {
      this.dtTriggerMonthlyTable.next("");
    }, 300);


    //this.dtTriggerSummaryTable.next();
    this.isRenderSummaryTable = true;

    //this.dtTriggerMonthlyTable.next();
    this.isRenderMonthlyTable = true;
  }
  getEmployees() {
    this.spinner.show();


     this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/GetEmpsByMGR').pipe(
      finalize(() => this.spinner.hide())
      ).subscribe((res: { Status: number; Result: any; }) => {
      if (res.Status == 1) {
        this.employeesListData = res.Result;
        this.getEmployeesData(this.employeesListData);
   
      }
    })
  }
  onDateChange(e: any, d: any) {

  }
  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }
  GetReport() {
    console.log(this.mgrReportForm.fdateF)
    console.log(this.mgrReportForm.tdateF)
    console.log(this.localEmp.emp_id)
    console.log(this.EmployeeCtrl.value)

  let empid = this.EmployeeCtrl.value.id >= 0 ? this.EmployeeCtrl.value.id : -1;
    if (empid == undefined)
      empid = -1;
    else
      empid = empid;

    this.mgrReportForm.fdate = (new Date(this.mgrReportForm.fdateF)).ToOADate();
    this.mgrReportForm.tdate = (new Date(this.mgrReportForm.tdateF)).ToOADate();

    if (this.reportType === '1') {
      this.spinner.show();

      console.log(this.mgrReportForm.fdate)
      console.log(this.mgrReportForm.tdate)
      console.log(empid.toString())
      this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/TimeSheet/GetDailyTimeSheetForManager/' + this.mgrReportForm.fdate + '/' + this.mgrReportForm.tdate + '/' + empid.toString()).pipe(
        finalize(() => this.spinner.hide())
  ).subscribe((res: { Status: number; Result: any; }) => {
        if (res.Status == 1) {
          this.empDailyList = res.Result;
          if (!this.isRenderSummaryTable) {

            this.dtTriggerSummaryTable.next("");
            this.isRenderSummaryTable = true;

          } else {
            this.MGRTimeSheetSummaryTable.dtInstance!.then((dtInstance: DataTables.Api) => {
              // Destroy the table first
              dtInstance.rows().clear();
              dtInstance.destroy();
              // Call the dtUGTrigger to rerender Group Table again
              setTimeout( () => {
                this.dtTriggerSummaryTable.next("");
              }, 300);
            });
          }
        }
        //console.log(this.reasons);
      })
    }
    else if (this.reportType === '2') {
      this.spinner.show();


       this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/TimeSheet/GetMonthlySummaryTimeSheetForManager/' + empid.toString() + '/' + this.mgrReportForm.fdate + '/' + this.mgrReportForm.tdate) .pipe(
        finalize(() => this.spinner.hide())
        ).subscribe((res: { Status: number; Result: any; }) => {
        if (res.Status == 1) {
          this.empMonthlyList = res.Result;
          if (!this.isRenderMonthlyTable) {

            this.dtTriggerMonthlyTable.next("");
            this.isRenderMonthlyTable = true;

          } else {
            this.TimeSheetForManagerTableMonthlySummaryTable.dtInstance!.then((dtInstance: DataTables.Api) => {
              // Destroy the table first
              dtInstance.rows().clear();
              dtInstance.destroy();
              // Call the dtUGTrigger to rerender Group Table again
              setTimeout( () => {
                this.dtTriggerMonthlyTable.next("");
              }, 300);
            });
          }
        }
        //console.log(this.reasons);
      })
    }
  }

  transDetails = null;
  transDetailsDay = null;



  ViewSelectedDiv(val: number) {
    if (val === 1) {
      jQuery("#divDailySummary").fadeIn(200);
      jQuery("#divMonthlySummary").hide();
    }
    else {
      jQuery("#divMonthlySummary").fadeIn(200);
      jQuery("#divDailySummary").hide();
    }
  }

  mothlyData = {
    Emp_ID: 0,
    FromDate: 0,
    ToDate: 0
  }

  transParam = {
    empid: null,
    mdate: null,
  }


  UserSelectiontoviewMS(emp_id: number, fdateno: number, tdateno: number) {

    this.mothlyData.Emp_ID = emp_id;
    this.mothlyData.FromDate = fdateno;
    this.mothlyData.ToDate = tdateno;

    // this.busy = this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/TimeSheet/GetTimeSheetMonthlyDetailsForManager/' + emp_id + '/' + fdateno + '/' + tdateno).subscribe(res => {
    //   if (res.Status == 1) {
    //     this.transDetails = res.Result;
    //     if (this.transDetails != null) {
    //       setTimeout(function () {
    //         this.message = jQuery("#MonthlyDiv").html();
    this.openForm();
    //       }.bind(this), 200);
    //     }
    //   }
    //   //console.log(this.reasons);
    // })
  }

  UserSelectiontoviewDailyDetails(empid: null, mdate: null) {

    this.transParam.empid = empid;
    this.transParam.mdate = mdate;

    // this.busy = this.api.getRequestAS(AppSettings.WebApiUrl + "SelfServices/TimeSheet/GetTransDetailsForManager/" + empid + "/" + mdate).subscribe(res => {
    //   if (res.Status == 1) {
    //     this.transDetailsDay = res.Result;
    //     if (this.transDetailsDay != null) {
    //       setTimeout(function () {
    //         this.message = jQuery("#MGRTransDetailsDialog").html();
    this.openForm();
    //       }.bind(this), 500);
    //     }
    //   }
    // });
  }


  openForm() {


    this.alert.refID = 11;
    this.alert.actionName = 'add';
    this.alert.modalTitle = this.translate.getValue('DutyDetails');

    this.alert.modalFooter = true; //show footer
    this.alert.modalMessage = false; //display message
    //this.alert.message = this.message;
    // this.accountChartAction.cssModal = 'fade';
    this.alert.okButton = false; //show Ok Button
    this.alert.cancelButton = true; //show cancel Button
    this.alert.okButtonText = this.translate.getValue('btOk');
    this.alert.cancelButtonText = this.translate.getValue('bt_close');
    this.alert.backdropModal = 'static';
    let componentData: { component: typeof EmpTransDetailsComponent | typeof MonthTransViewComponent; inputs: { transParam: { empid: null; mdate: null; }; } | { mothlyData: { Emp_ID: number; FromDate: number; ToDate: number; }; }; };
    if (this.reportType == '1') {
      componentData = {

        component: EmpTransDetailsComponent,
        inputs: {
          transParam: this.transParam,

        }
      };
    }
    else {
      componentData = {

        component: MonthTransViewComponent,
        inputs: {
          mothlyData: this.mothlyData,

        }
      };
    }
    setTimeout( () => {
      this.alert.openDynamic(componentData, 'lg');//md,sm,lg
    }, 200);
  }
  onDismissAlert() { }

  SelectSection(sec_ID: any, sec_Name: any) {

  }

  printMonthlyReport() {
    this.mothlyData.FromDate = (new Date(this.mgrReportForm.fdateF)).ToOADate();
    this.mothlyData.ToDate = (new Date(this.mgrReportForm.tdateF)).ToOADate();
    this.mothlyData.Emp_ID = this.EmployeeCtrl.value?.id;//this.localEmp.emp_id;
    if (this.reportType === '1') {
      this.OpenFile(AppSettings.ReportApiUrl + 'SelfServices/Daily/PrintReport', this.mothlyData, "Post")
    }
    else {
      this.OpenFile(AppSettings.ReportApiUrl + 'SelfServices/Monthly/PrintReport', this.mothlyData, "Post")
    }
  }
  OpenFile = function (url: string, data: string | any[] | JQuery<HTMLElement> | JQuery.PlainObject<any> | null, method: string) {
    if (data == null)
      data = {};
    //url and data options required
    if (url && data) {
      //data can be string of parameters or array/object
      data = typeof data == 'string' ? data : jQuery.param(data);
      //split params into form inputs
      var inputs = '';
      jQuery.each(data.split('&'), function () {
        var pair = this.split('=');
        inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
      });
      //send request
      jQuery('<form action="' + url + '" method="' + (method || 'post') + '" target="_blank">' + inputs + '</form>')
        .appendTo('body').submit().remove();
    };
  };
  //////////
  
public EmployeeCtrl: FormControl = new FormControl();
filteredEmployees: Observable<IdTextPair[]>=new Observable<IdTextPair[]>;


@ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;


displayFn(user: IdTextPair): string {
  return user && user.text ? user.text : '';
}
}
