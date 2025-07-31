import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError, finalize } from 'rxjs';
import { AlertMsgComponent } from 'src/app/Modals/alert.component';
import { TranslateService } from 'src/app/shared/TranslateService';
import { APIRestFulService } from 'src/app/shared/apiRestful.service';
import { AuthService } from 'src/app/shared/auth.service';
import { AppSettings } from 'src/app/shared/global.settings';
import { LodingSpinnerService } from 'src/app/shared/loadingspinner.service';
import { Notifications } from 'src/app/shared/notifications';
import { ResponseResult } from 'src/app/shared/responseresult';
import { UserTokenInfo } from 'src/app/shared/usertokeninfo';

@Component({
  selector: 'app-remote-work-request',
  templateUrl: './remote-work-request.component.html',
  styleUrls: ['./remote-work-request.component.css']
})
export class RemoteWorkRequestComponent {
  remoteWorkForm: FormGroup;
  @ViewChild('alert') alert!: AlertMsgComponent;
  message!: string;
  user: UserTokenInfo | null;

  constructor(private fb: FormBuilder, private api: APIRestFulService, private router: Router,
    private authService: AuthService,
    private _notifcation: Notifications, private translate: TranslateService, private http: HttpClient, private spinner: LodingSpinnerService) {

  
    this.remoteWorkForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      notes: ['']
    });
    this.user = this.authService.UserInfo()
  }

  submit() {
    this.HideExecuseErrormsg();
    var exc_count = new Date(this.remoteWorkForm.value.endDate).ToOADate() - new Date(this.remoteWorkForm.value.startDate).ToOADate();
    console.log(exc_count)
    if (exc_count > 7) {
      this.ShowExecuseErrormsg(this.translate.getValue('ExcuceDaysValidationErr'));
      return;
    }
    if (exc_count < 0) {
      this.ShowExecuseErrormsg(this.translate.getValue('ExcuceDaysValidationErr'));
      return;
    }
    var totexecTime = this.CalculateExecuseHours();

    if (totexecTime == "") {
      this.ShowExecuseErrormsg(this.translate.getValue('WorkValidationErr'));
      return;
    }
    this.canAddExc();
    // this.message = jQuery("#ExecConfairmDiv").html();
    // this.openForm();

    // let totexecTime = this.CalculateExecuseHours();

    // //console.log(totexecTime);
    // if (totexecTime == "") {
    //   //this._notifcation.showError('', this.translate.getValue('ExcuceValidationErr') );
    //   this.ShowExecuseErrormsg(this.translate.getValue('ExcuceValidationErr'));
    //   return;
    // }
    // else {
    //  this.canAddExc();

   // }
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
    // this.excuseForm.exc_date =(new Date(this.excuseForm.exc_dateF)).ToOADate(); //dd.ToOADate();
     this.spinner.show();
     var excuseForm = {
      exc_empid: this.user!.UserEmpID,
      exc_ftime: jQuery('#exc_ftime').val(),
      exc_ttime: jQuery('#exc_ttime').val(),
      exc_type: 3,
      exc_date: new Date(this.remoteWorkForm.value.startDate).ToOADate(),
      exc_todate: new Date(this.remoteWorkForm.value.endDate).ToOADate(),
      execuseReason_ID: 4
    };
 
      this.api.post(AppSettings.WebApiUrl + 'SelfServices/Excuse/CanAdd', excuseForm, true).pipe(
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
  getShiftInfo(): void {
    this.spinner.show();

    var date = new Date(this.remoteWorkForm.value.startDate).ToOADate()
    this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/Excuse/GetShiftInfo/'+ date +'/' + this.user?.UserEmpID).pipe(
      finalize(() => this.spinner.hide()))
    .subscribe((res:any) => {
       console.log(res)
      if (res.Status == 1) {
        jQuery('#exc_ftime').val(res.Result.shift_fin);
        jQuery('#exc_ttime').val(res.Result.shift_sout != '--:--' ? res.Result.shift_sout : res.Result.shift_fout);
      }
    })
   
  }

  onCloseAlert() {
    if (this.remoteWorkForm.valid) {
      var excuseForm = {
        exc_empid: this.user!.UserEmpID,
        exc_ftime: jQuery('#exc_ftime').val(),
        exc_ttime: jQuery('#exc_ttime').val(),
        exc_type: 3,
        exc_date: new Date(this.remoteWorkForm.value.startDate).ToOADate(),
        exc_todate: new Date(this.remoteWorkForm.value.endDate).ToOADate(),
        execuseReason_ID: 4,
        exc_TotalTime : this.CalculateExecuseHours(),
        TaskDetails : jQuery("#ExecBodyDiv").html()
      };
   
    let apiUrl1 = AppSettings.WebApiUrl + 'SelfServices/WorkRemote/AddByEmp';

    this.spinner.show();
    this.api.post(apiUrl1, excuseForm).pipe(
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
    }
   



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
