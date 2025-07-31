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
import { Observable } from 'rxjs';

@Component({
  selector: 'MgrExcuse',
  templateUrl: './mgr-excuse.component.html',
  styleUrls: ['./mgr-excuse.component.css']
})
export class MgrExcuseComponent implements OnInit, AfterViewInit {

  ngAfterViewInit() {
    setTimeout(function () {
      this.getEmployees();
    }.bind(this), 300);
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
    execuseReason_ID: null,
    exc_reason: '',
    TaskDetails: '',
    emp_name: '',
    exc_Attach: null
  };
  reasons;



  UserInfo: UserTokenInfo;

  message: string;

  fileAttach = null;

  @ViewChild('alert') alert: AlertMsgComponent;

  constructor(private api: APIRestFulService, private router: Router,
    private authService: AuthService,
    private _notifcation: Notifications, private translate: TranslateService, private spinner: LodingSpinnerService) {

  }

  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }

  Select2OptionsGroup?: Select2Options;
  localEmployeedata: Array<IdTextPair> = null;
  employeesListData;
  localEmp: { emp_id: 0,emp_name:'' };

  ngOnInit() {

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


    this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/GetEmpsByMGR').finally(() => {
      this.spinner.hide();
    }).subscribe(res => {

      if (res.Status == 1) {
        this.employeesListData = res.Result;
        this.getEmployeesData(this.employeesListData);

      }
    })
  }
  onDateChange(e, d) {
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


    this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/Excuse/Reasons/GetAll').finally(() => {
      this.spinner.hide();
    }).subscribe(res => {
      if (res.Status == 1) {
        this.reasons = res.Result.filter(e => e.exc_type == type);
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

  ShowExecuseErrormsg(msg) {
    jQuery("#errexecusemsg_mgr").html(msg);

    jQuery("#errexecusemsg_mgr").fadeIn(200);
  }
  HideExecuseErrormsg() {
    jQuery("#errexecusemsg_mgr").hide();
  }
  canAddExc() {
    this.excuseForm_mgr.exc_date = (new Date(this.excuseForm_mgr.exc_dateF)).ToOADate(); //dd.ToOADate();
    this.excuseForm_mgr.exc_empid = this.localEmp.emp_id[0];
    this.excuseForm_mgr.emp_name= this.localEmp.emp_name;
    this.spinner.show();


    this.api.post(AppSettings.WebApiUrl + 'SelfServices/Excuse/CanManagerAddExecuse', this.excuseForm_mgr, true).finally(() => {
      this.spinner.hide();
    }).subscribe((res: ResponseResult) => {
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

    setTimeout(function () {
      this.alert.openDynamic(null, 'md');//md,sm,lg
    }.bind(this), 200);
  }

  fileChange(event) {

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

  onCloseAlert($event) {

    //this.excuseForm_mgr.TaskDetails = jQuery("#ExecBodyDiv_mgr").html();


    this.excuseForm_mgr.exc_date = (new Date(this.excuseForm_mgr.exc_dateF)).ToOADate();

    let formData: FormData = new FormData();
    if (this.fileAttach != null)
      formData.append('AttachmentFile', this.fileAttach, this.fileAttach.name);

    formData.append('exc_empid', this.excuseForm_mgr.exc_empid.toString());
    formData.append('emp_name', this.excuseForm_mgr.emp_name.toString());

    formData.append('exc_date', this.excuseForm_mgr.exc_date.toString());
    formData.append('exc_ftime', this.excuseForm_mgr.exc_ftime);
    formData.append('exc_ttime', this.excuseForm_mgr.exc_ttime);
    formData.append('exc_reason', this.excuseForm_mgr.exc_reason);
    formData.append('execuseReason_ID', this.excuseForm_mgr.execuseReason_ID);
    formData.append('execuseReasonString', this.getSelectedReasonText_mgr());
    formData.append('exc_TotalTime', this.CalculateExecuseHours_mgr());
    formData.append('exc_type', this.excuseForm_mgr.exc_type);
    formData.append('TaskDetails', this.excuseForm_mgr.TaskDetails);



    let headers = new Headers()
    let apiUrl1 = AppSettings.WebApiUrl + 'SelfServices/Excuse/ManagerAddExecuseWithAttach';

    this.spinner.show();


    this.api.postFormData(apiUrl1, formData)
      .catch(error => Observable.throw(error)).finally(() => {
        this.spinner.hide();
      })
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


      let d1 = $('#exc_ftime_mgr').timepicker('getTime')
      let d2 = $('#exc_ttime_mgr').timepicker('getTime')
      if (d1 == null || d2 == null)
        return "";
      if (d1 > d2) {
        d2 = d2.add({ days: 1 })
      }
      let millis = (d2 - d1);
      let hours = Math.floor(millis / 36e5),
        mins = Math.floor((millis % 36e5) / 6e4);

      return this.Zeropad(hours, 2) + ":" + this.Zeropad(mins, 2);
    } catch (e) {
      return "";
    }
  }

  Zeropad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }


}
