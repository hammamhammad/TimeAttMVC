import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppSettings } from '../../shared/global.settings';
import { UserTokenInfo } from '../../shared/usertokeninfo';
import { AlertMsgComponent } from '../../Modals/modal.module';
import { APIRestFulService } from '../../shared/apiRestful.service';
import { Router } from '@angular/router';
import { TranslateService } from '../../shared/TranslateModule';
import { AuthService } from '../../shared/auth.service';
import { Notifications } from '../../shared/notifications';
import { LodingSpinnerService } from '../../shared/loadingspinner.service';
import { ResponseResult } from '../../shared/responseresult';
import { Observable, finalize, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'MgrExcuse',
  templateUrl: './mgr-excuse.component.html',
  styleUrls: ['./mgr-excuse.component.css']
})
export class MgrExcuseComponent implements OnInit, AfterViewInit {

  ngAfterViewInit() {
    setTimeout( () => {
      this.getEmployees();
    }, 300);
  }

  ftimeoption = { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '08:00', 'minTime': '00:00', 'maxTime': '23:59' };
  ttimeoption = { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '09:00', 'minTime': '00:00', 'maxTime': '23:59' };
  excuseForm_mgr = {
    exc_empid: 0,
    exc_ftime: '',
    exc_ttime: '',
    exc_type: null,
    exc_date: 0,
    exc_dateF: '',
    exc_todate: 0,
    exc_dateT : '',
    execuseReason_ID: null,
    exc_reason: '',
    TaskDetails: '',
    emp_name: '',
    exc_Attach: null
  };
  reasons: any;



  UserInfo!: UserTokenInfo|null;

  message!: string;

  fileAttach! : File|null;

  @ViewChild('alert') alert!: AlertMsgComponent;

  constructor(private api: APIRestFulService, private router: Router,
    private authService: AuthService,
    private _notifcation: Notifications, private translate: TranslateService, private spinner: LodingSpinnerService) {

  }

  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }

  Select2OptionsGroup?: Select2Options;
  localEmployeedata: Array<IdTextPair>|null = null;
  employeesListData!: any[];
  localEmp!: { emp_id: 0; emp_name: ''; };
  public EmployeeCtrl: FormControl = new FormControl();
  filteredEmployees: Observable<IdTextPair[]>=new Observable<IdTextPair[]>;
  
  
  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;
  
  
  displayFn(user: IdTextPair): string {
    return user && user.text ? user.text : '';
  }
  ngOnInit() {
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
    this.UserInfo = this.authService.UserInfo();
    this.localEmployeedata = null;
    this.localEmp = { emp_id: 0 ,emp_name:''};
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

  }

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

  getEmployees() {
    this.spinner.show();
    this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/GetEmpsByMGR').pipe(
      finalize(() => this.spinner.hide()))
    .subscribe((res: { Status: number; Result: any; }) => {
      if (res.Status == 1) {
        this.employeesListData = res.Result;
        this.getEmployeesData(this.employeesListData);

      }
    })
  }
  onDateChange(e: any, d: any) {
  }

  GetReasons() {
    this.excuseForm_mgr.exc_ftime = '';
    this.excuseForm_mgr.exc_ttime = '';
    let type = this.excuseForm_mgr.exc_type;
    this.excuseForm_mgr.execuseReason_ID = null;
    if (type === "1") {
      this.ftimeoption = { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '08:00', 'minTime': '00:00', 'maxTime': '23:59' };
      this.ttimeoption = { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '09:00', 'minTime': '00:00', 'maxTime': '23:59' };
    } else if (type === "2") {
      this.ftimeoption = { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '07:00', 'minTime': '00:00', 'maxTime': '23:59' };
      this.ttimeoption = { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '09:00', 'minTime': '00:00', 'maxTime': '23:59' };
    }

    this.spinner.show();


    this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/Excuse/Reasons/GetAll').pipe(
      finalize(() => this.spinner.hide())).subscribe((res: { Status: number; Result: any[]; }) => {
      if (res.Status == 1) {
        this.reasons = res.Result.filter((e: { exc_type: null; }) => e.exc_type == type);
      }
      console.log(this.reasons);
    })
  }

  submit() {
    this.HideExecuseErrormsg();

    let totexecTime = this.CalculateExecuseHours_mgr();

    if (totexecTime == "") {
      this.ShowExecuseErrormsg(this.translate.getValue('ExcuceValidationErr'));
      return;
    }
    else {
      this.canAddExc();

    }
  }
  getSelectedReasonText_mgr() {
    return jQuery("#ddexcexuserequestreson_mgr option:selected").text();
  }

  getExcuseTypeText_mgr() {
    return jQuery("#ddlexecusetype_mgr option:selected").text();
  }

  ShowExecuseErrormsg(msg: string | Element | Comment | Document | DocumentFragment | ((this: HTMLElement, index: number, oldhtml: string) => string | JQuery.Node)) {
    jQuery("#errexecusemsg_mgr").html(msg);

    jQuery("#errexecusemsg_mgr").fadeIn(200);
  }
  HideExecuseErrormsg() {
    jQuery("#errexecusemsg_mgr").hide();
  }
  canAddExc() {
    this.excuseForm_mgr.exc_date = (new Date(this.excuseForm_mgr.exc_dateF)).ToOADate(); //dd.ToOADate();
    this.excuseForm_mgr.exc_todate = (new Date(this.excuseForm_mgr.exc_dateT)).ToOADate(); //dd.ToOADate();
    this.excuseForm_mgr.exc_empid = this.EmployeeCtrl.value?.id;//this.localEmp.emp_id;//[0]
    this.excuseForm_mgr.emp_name= this.EmployeeCtrl.value?.text;
    this.spinner.show();


    this.api.post(AppSettings.WebApiUrl + 'SelfServices/Excuse/CanManagerAddExecuse', this.excuseForm_mgr, true).pipe(
      finalize(() => this.spinner.hide())).subscribe((res: ResponseResult) => {
      if (res.Status) {
        this.message = jQuery("#ExecConfairmDiv_mgr").html();
        this.openForm();
      }
      else {
        this.ShowExecuseErrormsg(res.Msg);
      }

    }, (error: Response) => {
      this.ShowExecuseErrormsg(error.toString());
    })
  }
  openForm() {
    this.alert.refID = 11;
    this.alert.actionName = 'add';
    this.alert.modalTitle = this.translate.getValue('ConfirmationMSG');

    this.alert.modalFooter = true; //show footer
    this.alert.modalMessage = true; //display message
    this.alert.message = this.message;

    this.alert.okButton = true; //show Ok Button
    this.alert.cancelButton = true; //show cancel Button
    this.alert.okButtonText = this.translate.getValue('btnSend');
    this.alert.cancelButtonText = this.translate.getValue('btCancel');
    this.alert.backdropModal = 'static';

    setTimeout( () => {
      this.alert.openDynamic(null, 'md');//md,sm,lg
    }, 200);
  }

  fileChange(event: any) {

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let fileSize: number = fileList[0].size;






      if (fileSize <= 10485760) {

        this.fileAttach = file;
      }
      else {
        this.ShowExecuseErrormsg(this.translate.getValue('FilesizeErr'));
      }
    }

  }

  onCloseAlert($event: any) {

    //this.excuseForm_mgr.TaskDetails = jQuery("#ExecBodyDiv_mgr").html();


    this.excuseForm_mgr.exc_date = (new Date(this.excuseForm_mgr.exc_dateF)).ToOADate();
    this.excuseForm_mgr.exc_todate = (new Date(this.excuseForm_mgr.exc_dateT)).ToOADate();

    let formData: FormData = new FormData();
    if (this.fileAttach != null)
      formData.append('AttachmentFile', this.fileAttach, this.fileAttach.name);

    formData.append('exc_empid', this.excuseForm_mgr.exc_empid.toString());
    formData.append('emp_name', this.excuseForm_mgr.emp_name.toString());

    formData.append('exc_date', this.excuseForm_mgr.exc_date.toString());
    formData.append('exc_ftime', this.excuseForm_mgr.exc_ftime);
    formData.append('exc_ttime', this.excuseForm_mgr.exc_ttime);
    formData.append('exc_reason', this.excuseForm_mgr.exc_reason);
    formData.append('execuseReason_ID', this.excuseForm_mgr.execuseReason_ID!);
    formData.append('execuseReasonString', this.getSelectedReasonText_mgr());
    formData.append('exc_TotalTime', this.CalculateExecuseHours_mgr());
    formData.append('exc_type', this.excuseForm_mgr.exc_type!);
    formData.append('TaskDetails', this.excuseForm_mgr.TaskDetails);
    formData.append('exc_todate', this.excuseForm_mgr.exc_todate.toString());



    let headers = new Headers()
    let apiUrl1 = AppSettings.WebApiUrl + 'SelfServices/Excuse/ManagerAddExecuseWithAttach';

    this.spinner.show();


    this.api.postFormData(apiUrl1, formData)
    .pipe(
      finalize(() => this.spinner.hide()))
      .subscribe((res: ResponseResult) => {

        if (res.Status) {

          this._notifcation.showSuccess('', this.translate.getValue('Yourrequestimplementedsuccessfully'));
          this.router.navigate(['myrequests']);


        }
        else {
          this.ShowExecuseErrormsg(res.Msg)

        }
      }, (error: Response) => {

      })


  }

  onOpenAlert() { }

  onDismissAlert() { }

  CalculateExecuseHours_mgr() {
    try {


      // let d1 = $('#exc_ftime_mgr').timepicker('getTime')
      // let d2 = $('#exc_ttime_mgr').timepicker('getTime')
      // if (d1 == null || d2 == null)
      //   return "";
      // if (d1 > d2) {
      //   d2 = d2.add({ days: 1 })
      // }
      // let millis = (d2 - d1);
      // let hours = Math.floor(millis / 36e5),
      //   mins = Math.floor((millis % 36e5) / 6e4);
        let d1 : any = $('#exc_ftime_mgr').val()
        let d2 :any = $('#exc_ttime_mgr').val()
        console.log(d1)
        console.log(d2)
        if (d1 == null || d2 == null)
          return "";
          const startMinutes = parseInt(d1.split(':')[0]) * 60 + parseInt(d1.split(':')[1]);
          const endMinutes = parseInt(d2.split(':')[0]) * 60 + parseInt(d2.split(':')[1]);
        
          // Calculate difference
          let difference = endMinutes - startMinutes;
        
          // Handle cases where the end time is the next day
          if (difference < 0) {
            difference += 24 * 60; // Add 24 hours
          }
        
          // Convert difference back to hours and minutes
          const hours = Math.floor(difference / 60);
          const minutes = difference % 60;
      return this.Zeropad(hours, 2) + ":" + this.Zeropad(minutes, 2);
    } catch (e) {
      return "";
    }
  }

  Zeropad(num: string | number, size: number) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }


}
