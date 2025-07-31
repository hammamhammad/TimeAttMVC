import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { AppSettings } from '../shared/global.settings';
import { LodingSpinnerService } from '../shared/loadingspinner.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subscription, catchError, finalize, throwError } from 'rxjs';
import { AuthService } from './../shared/auth.service';
import { Notifications } from './../shared/notifications';
import { APIRestFulService } from '../shared/apiRestful.service';
import { UserTokenInfo } from '../shared/usertokeninfo';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '../shared/TranslateService';
import { ResponseResult } from '../shared/responseresult';
import { AlertMsgComponent } from '../Modals/alert.component';

@Component({
  selector: 'excuse',
  templateUrl: './excuse.component.html',
  styleUrls: ['./excuse.component.css']
})
export class ExcuseComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() {
    this.GetReasons();
  }
  ftimeoption :any= { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '08:00', 'minTime': '00:00', 'maxTime': '23:59' };
  ttimeoption :any= { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '09:00', 'minTime': '00:00', 'maxTime': '23:59' };
  excuseForm = {
    exc_empid: 0,
    exc_ftime: '',
    exc_ttime: '',
    exc_type: '',
    exc_date: 0,
    exc_dateF: '',
    exc_todate : 0,
    exc_dateT: '',
    execuseReason_ID: '',
    exc_reason: '',
    TaskDetails: '',
    exc_Attach: ''
  };
  reasons: any;

  //workflowEntity = { AppID: 1, RefID: 0, WorkFlowID: 1, Title: 'طلب إستئذان', TitleEN: 'Excuse request' }

  UserInfo!: UserTokenInfo |null ;

  message!: string;
  busy!: Subscription;

  fileAttach :File | null | undefined;

  @ViewChild('alert') alert!: AlertMsgComponent;

  constructor(private api: APIRestFulService, private router: Router,
    private authService: AuthService,
    private _notifcation: Notifications, private translate: TranslateService, private http: HttpClient, private spinner: LodingSpinnerService) {

  }

  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }

  ngOnInit() {
    this.UserInfo = this.authService.UserInfo()!;
    // if (this.UserInfo == null) {
    //   this.router.navigate(['login']);
    // }
    // else
    this.excuseForm.exc_empid = this.UserInfo.UserEmpID!;
  }

  

  GetReasons() {
    this.excuseForm.exc_ftime = '';
    this.excuseForm.exc_ttime = '';
    let type = this.excuseForm.exc_type;
    this.excuseForm.execuseReason_ID = '';
    if (type === "1") {
      this.ftimeoption = { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '08:00', 'minTime': '00:00', 'maxTime': '23:59' };
      this.ttimeoption = { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '09:00', 'minTime': '00:00', 'maxTime': '23:59' };
    } else if (type === "2") {
      this.ftimeoption = { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '07:00', 'minTime': '00:00', 'maxTime': '23:59' };
      this.ttimeoption = { disableTextInput: false, 'timeFormat': 'H:i', showDuration: false, step: 1, scrollDefault: '09:00', 'minTime': '00:00', 'maxTime': '23:59' };
    }

    this.spinner.show();


     this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/Excuse/Reasons/GetAll').pipe(
      finalize(() => this.spinner.hide()))
      .subscribe((res: { Status: number; Result: any[]; }) => {
      if (res.Status == 1) {
        this.reasons = res.Result.filter(e => e.exc_type == type);
      }
      console.log(this.reasons);
    })
    // console.log(this.excuseForm);
  }

  submit() {
    this.HideExecuseErrormsg();
    var type = $("#ddlexecusetype option:selected").val();
    if (type == null || type == -1) {
        this.ShowExecuseErrormsg(this.translate.getValue('SelectExecType'));
        return;
    }

    if (type == 2 && (new Date(jQuery("#divExcuseDate").val()?.toString()!).ToOADate() > new Date(jQuery("#divExcuseToDate").val()?.toString()!).ToOADate())) {
        this.ShowExecuseErrormsg(this.translate.getValue('ExcuceValidationErr'));
        return;
    }
    var exc_count = new Date(jQuery("#divExcuseToDate").val()?.toString()!).ToOADate() - new Date(jQuery("#divExcuseDate").val()?.toString()!).ToOADate();
    if ( exc_count > 7) {
        this.ShowExecuseErrormsg(this.translate.getValue('ExcuceDaysValidationErr'));
        return;
    }
    var execusereson = jQuery("#ddexcexuserequestreson option:selected").val();
    if (execusereson == null || execusereson == -1) {
        this.ShowExecuseErrormsg(this.translate.getValue('SelectExecReson'));
        return;
    }
   
 
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

  ShowExecuseErrormsg(msg :string) {
    jQuery("#errexecusemsg").html(msg);

    jQuery("#errexecusemsg").fadeIn(200);
  }
  HideExecuseErrormsg() {
    jQuery("#errexecusemsg").hide();
  }
  canAddExc() {

   // let dd=new Date(parseInt(this.excuseForm.exc_dateF.split('-')[0],10),parseInt(this.excuseForm.exc_dateF.split('-')[1],10)-1,parseInt(this.excuseForm.exc_dateF.split('-')[2],10));
   this.excuseForm.exc_todate = this.excuseForm.exc_type == "2" ? new Date(this.excuseForm.exc_dateT).ToOADate() : -1,
       
   this.excuseForm.exc_date =(new Date(this.excuseForm.exc_dateF)).ToOADate(); //dd.ToOADate();
    this.spinner.show();


     this.api.post(AppSettings.WebApiUrl + 'SelfServices/Excuse/CanAdd', this.excuseForm, true).pipe(
      finalize(() => this.spinner.hide())).subscribe((res: ResponseResult) => {
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
    setTimeout( () => this.alert.openDynamic(null, 'md'), 200);
  }

  fileChange(event:  any) {

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

  onCloseAlert() {

    this.excuseForm.TaskDetails = jQuery("#ExecBodyDiv").html();


    this.excuseForm.exc_date = (new Date(this.excuseForm.exc_dateF)).ToOADate();
    this.excuseForm.exc_todate = (this.excuseForm.exc_type == "2" ? new Date(this.excuseForm.exc_dateT).ToOADate() : -1)
    let formData: FormData = new FormData();
    if (this.fileAttach != null)
      formData.append('AttachmentFile', this.fileAttach, this.fileAttach.name);
    console.log(this.excuseForm)
    formData.append('exc_date', this.excuseForm.exc_date.toString());
    formData.append('exc_ftime', this.excuseForm.exc_ftime);
    formData.append('exc_ttime', this.excuseForm.exc_ttime);
    formData.append('exc_reason', this.excuseForm.exc_reason);
    formData.append('execuseReason_ID', this.excuseForm.execuseReason_ID);
    formData.append('execuseReasonString', this.getSelectedReasonText());
    formData.append('exc_TotalTime', this.CalculateExecuseHours());
    formData.append('exc_type', this.excuseForm.exc_type);
    formData.append('TaskDetails', this.excuseForm.TaskDetails);
    formData.append('exc_todate', this.excuseForm.exc_todate.toString());
   


    let headers = new Headers()
    //headers.append('Content-Type', 'json');
    //headers.append('Accept', 'application/json');
   // let options = new RequestOptions({ headers: headers });
    let apiUrl1 = AppSettings.WebApiUrl + 'SelfServices/Excuse/AddByEmpWithAttach';

    this.spinner.show();
formData.forEach((k,e)=>{console.log(k);console.log(e)})
    this.api.postFormData(apiUrl1, formData).pipe(
      catchError((error: any) => throwError(() => error)),
      finalize(() => this.spinner.hide()))
    
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

      let d1 : any = $('#exc_ftime').val()
      let d2 :any = $('#exc_ttime').val()
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
      // if (d1 > d2) {
      //   d2 = d2.add({ days: 1 })
      // }
      // let millis = (d2 - d1);
      // let hours = Math.floor(millis / 36e5),
      //   mins = Math.floor((millis % 36e5) / 6e4);
      // //if (mins < 0 || hours < 0)
      // //    return "";
      // console.log(this.Zeropad(hours, 2) + ":" + this.Zeropad(mins, 2))
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
