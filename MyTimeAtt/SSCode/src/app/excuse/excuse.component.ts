import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { UserTokenInfo } from './../shared/usertokeninfo';
import { AuthService } from './../shared/auth.service';
import { state } from '@angular/animations';
import { ResponseResult } from './../shared/responseresult';

import { AlertMsgComponent } from './../Modals/alert.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { APIRestFulService } from '../shared/apiRestful.service';
import { AppSettings } from '../shared/global.settings';
import { log } from 'util';
import { ReturnStatement } from '@angular/compiler/src/output/output_ast';
import { Notifications } from '../shared/notifications';
import { TranslateService } from '../shared/TranslateService';


import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LodingSpinnerService } from '../shared/loadingspinner.service';




@Component({
  selector: 'excuse',
  templateUrl: './excuse.component.html',
  styleUrls: ['./excuse.component.css']
})
export class ExcuseComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() {
    this.GetReasons();
  }
  ftimeoption = { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '08:00', 'minTime': '00:00', 'maxTime': '23:59' };
  ttimeoption = { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '09:00', 'minTime': '00:00', 'maxTime': '23:59' };
  excuseForm = {
    exc_empid: 0,
    exc_ftime: '',
    exc_ttime: '',
    exc_type: null,
    exc_date: 0,
    exc_dateF: '',
    execuseReason_ID: null,
    exc_reason: '',
    TaskDetails: '',
    exc_Attach: null
  };
  reasons;

  //workflowEntity = { AppID: 1, RefID: 0, WorkFlowID: 1, Title: 'طلب إستئذان', TitleEN: 'Excuse request' }

  UserInfo: UserTokenInfo;

  message: string;
  busy: Subscription;

  fileAttach = null;

  @ViewChild('alert') alert: AlertMsgComponent;

  constructor(private api: APIRestFulService, private router: Router,
    private authService: AuthService,
    private _notifcation: Notifications, private translate: TranslateService, private http: Http, private spinner: LodingSpinnerService) {

  }

  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }

  ngOnInit() {
    this.UserInfo = this.authService.UserInfo();
    // if (this.UserInfo == null) {
    //   this.router.navigate(['login']);
    // }
    // else
    this.excuseForm.exc_empid = this.UserInfo.UserEmpID;
  }

  onDateChange(e, d) {
  }

  GetReasons() {
    this.excuseForm.exc_ftime = '';
    this.excuseForm.exc_ttime = '';
    let type = this.excuseForm.exc_type;
    this.excuseForm.execuseReason_ID = null;
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
    // console.log(this.excuseForm);
  }

  submit() {
    this.HideExecuseErrormsg();

    let totexecTime = this.CalculateExecuseHours();

    //console.log(totexecTime);
    if (totexecTime == "") {
      //this._notifcation.showError('', this.translate.getValue('ExcuceValidationErr') );
      this.ShowExecuseErrormsg(this.translate.getValue('ExcuceValidationErr'));
      return;
    }
    else {
      this.canAddExc();

    }
  }
  getSelectedReasonText() {
    return jQuery("#ddexcexuserequestreson option:selected").text();
  }

  getExcuseTypeText() {
    return jQuery("#ddlexecusetype option:selected").text();
    // return jQuery("label[for='" + jQuery('input[name="exc_type"]:checked').attr("id") + "']").text();
  }

  ShowExecuseErrormsg(msg) {
    jQuery("#errexecusemsg").html(msg);

    jQuery("#errexecusemsg").fadeIn(200);
  }
  HideExecuseErrormsg() {
    jQuery("#errexecusemsg").hide();
  }
  canAddExc() {

   // let dd=new Date(parseInt(this.excuseForm.exc_dateF.split('-')[0],10),parseInt(this.excuseForm.exc_dateF.split('-')[1],10)-1,parseInt(this.excuseForm.exc_dateF.split('-')[2],10));
    this.excuseForm.exc_date =(new Date(this.excuseForm.exc_dateF)).ToOADate(); //dd.ToOADate();
    this.spinner.show();


     this.api.post(AppSettings.WebApiUrl + 'SelfServices/Excuse/CanAdd', this.excuseForm, true).finally(() => {
      this.spinner.hide();
  }).subscribe((res: ResponseResult) => {
      if (res.Status) {
        this.message = jQuery("#ExecConfairmDiv").html();
        this.openForm();
      }
      else {
        this.ShowExecuseErrormsg(res.Msg);
        //this._notifcation.showError('',res.Msg);
      }

    }, (error: Response) => {
      this.ShowExecuseErrormsg(error.toString());
      //this._notifcation.showError('',error.toString());
    })
    //console.log($event);
  }
  openForm() {
    this.alert.refID = 11;
    this.alert.actionName = 'add';
    this.alert.modalTitle = this.translate.getValue('ConfirmationMSG');

    this.alert.modalFooter = true; //show footer
    this.alert.modalMessage = true; //display message
    this.alert.message = this.message;
    // this.accountChartAction.cssModal = 'fade';
    this.alert.okButton = true; //show Ok Button
    this.alert.cancelButton = true; //show cancel Button
    this.alert.okButtonText = this.translate.getValue('btnSend');
    this.alert.cancelButtonText = this.translate.getValue('btCancel');
    this.alert.backdropModal = 'static';
    // let componentData = {
    //     component: AccountChartActionComponent,
    //     inputs: {
    //         fromAccountID: fromID,
    //         toAccountID: toID,
    //         toAccountIsType: typeID,
    //         action: action,
    //         accountType: this.accountType,
    //         accountClasses: this.accountClasses,
    //         accountFsItems: this.accountFsItems,
    //         title: ''
    //     }
    //};
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

    this.excuseForm.TaskDetails = jQuery("#ExecBodyDiv").html();


    this.excuseForm.exc_date = (new Date(this.excuseForm.exc_dateF)).ToOADate();

    let formData: FormData = new FormData();
    if (this.fileAttach != null)
      formData.append('AttachmentFile', this.fileAttach, this.fileAttach.name);

    formData.append('exc_date', this.excuseForm.exc_date.toString());
    formData.append('exc_ftime', this.excuseForm.exc_ftime);
    formData.append('exc_ttime', this.excuseForm.exc_ttime);
    formData.append('exc_reason', this.excuseForm.exc_reason);
    formData.append('execuseReason_ID', this.excuseForm.execuseReason_ID);
    formData.append('execuseReasonString', this.getSelectedReasonText());
    formData.append('exc_TotalTime', this.CalculateExecuseHours());
    formData.append('exc_type', this.excuseForm.exc_type);
    formData.append('TaskDetails', this.excuseForm.TaskDetails);



    let headers = new Headers()
    //headers.append('Content-Type', 'json');
    //headers.append('Accept', 'application/json');
   // let options = new RequestOptions({ headers: headers });
    let apiUrl1 = AppSettings.WebApiUrl + 'SelfServices/Excuse/AddByEmpWithAttach';

    this.spinner.show();


     this.api.postFormData(apiUrl1, formData)
      .catch(error => Observable.throw(error)).finally(() => {
      this.spinner.hide();
  })
      .subscribe((res: ResponseResult) => {

        if (res.Status ) {

          this._notifcation.showSuccess('', this.translate.getValue('Yourrequestimplementedsuccessfully'));
          this.router.navigate(['myrequests']);
          //console.log('done');
          // jQuery("#execuserequest").hide();
          // $('html, body').animate({ scrollTop: 0 }, 'slow');
          // jQuery("#execusemsgsuccess").slideDown("100");

        }
        else {
          this.ShowExecuseErrormsg(res.Msg)
          // jQuery("#execuserequest").hide();
          // $('html, body').animate({ scrollTop: 0 }, 'slow');
          // jQuery("#execusemsgerror").slideDown("100");
        }
      }, (error: Response) => {

      })
    //  this.ShowExecuseErrormsg(this.translate.getValue('AddExcuseErrorMsg'))




    // this.busy = this.api.post(AppSettings.WebApiUrl + 'SelfServices/Excuse/AddByEmp', formData, true).subscribe((res: ResponseResult) => {
    //   if (res.Status) {
    //     this._notifcation.showSuccess('', this.translate.getValue('Yourrequestimplementedsuccessfully'));
    //     this.router.navigate(['myrequests']);
    //     //console.log('done');
    //     // jQuery("#execuserequest").hide();
    //     // $('html, body').animate({ scrollTop: 0 }, 'slow');
    //     // jQuery("#execusemsgsuccess").slideDown("100");

    //   }
    //   else {
    //     this.ShowExecuseErrormsg(this.translate.getValue('AddExcuseErrorMsg'))
    //     // jQuery("#execuserequest").hide();
    //     // $('html, body').animate({ scrollTop: 0 }, 'slow');
    //     // jQuery("#execusemsgerror").slideDown("100");
    //   }

    // }, (error: Response) => {

    // })
    //     //console.log($event);

  }

  onOpenAlert() { }

  onDismissAlert() { }

  CalculateExecuseHours() {
    try {

      //var exectype = jQuery('input[name="execusetype"]:checked', '.filterradio').val();
      //if (exectype == 2)
      //    return "يوم كامل";

      // let ftime = jQuery('#exc_ftime').val();
      // let ttime = jQuery('#exc_ttime').val();

      let d1 = $('#exc_ftime').timepicker('getTime')
      let d2 = $('#exc_ttime').timepicker('getTime')
      if (d1 == null || d2 == null)
        return "";
      if (d1 > d2) {
        d2 = d2.add({ days: 1 })
      }
      let millis = (d2 - d1);
      let hours = Math.floor(millis / 36e5),
        mins = Math.floor((millis % 36e5) / 6e4);
      //if (mins < 0 || hours < 0)
      //    return "";
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
