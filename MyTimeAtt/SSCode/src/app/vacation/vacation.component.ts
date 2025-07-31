import { ResponseResult } from './../shared/responseresult';
import { Subscription } from 'rxjs/Subscription';
import { AppSettings } from './../shared/global.settings';
import { AuthService } from './../shared/auth.service';
import { Router } from '@angular/router';
import { APIRestFulService } from './../shared/apiRestful.service';
import { UserTokenInfo } from './../shared/usertokeninfo';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlertMsgComponent } from '../Modals/alert.component';
import { TranslateService } from '../shared/TranslateService';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Notifications } from '../shared/notifications';
import { LodingSpinnerService } from '../shared/loadingspinner.service';



@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() {
    this.GetVacationTypes();
  }

  vacationForm = { vac_fdate: 0, vac_tdate: 0, vac_fdateF: '', vac_tdateF: '', vac_type: null, vac_empid: 0, vac_typeT: '', vac_Attach: null, vac_reason: '' };
  vacationTypes;
  fileAttach = null;

  UserInfo: UserTokenInfo;

  message: string;
  busy: Subscription;

  @ViewChild('alert') alert: AlertMsgComponent;

  constructor(private api: APIRestFulService, private router: Router,
    private authService: AuthService, private _notifcation: Notifications, private translate: TranslateService, private http: Http, private spinner: LodingSpinnerService) { }

  ngOnInit() {
   
    this.UserInfo = this.authService.UserInfo();
    // if (this.UserInfo == null) {
    //   this.router.navigate(['login']);
    // }
    // else
    this.vacationForm.vac_empid = this.UserInfo.UserEmpID;


  }

  ShowErrormsg(msg) {
    jQuery("#errmsg").html(msg);

    jQuery("#errmsg").fadeIn(200);
  }
  HideErrormsg() {
    jQuery("#errmsg").hide();
  }

  onDateChange(e, d) {

  }

  GetVacationTypes() {
    this.vacationForm.vac_type = null;
    this.spinner.show();


    this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/Vacations/Types/GetAll').finally(() => {
      this.spinner.hide();
  }).subscribe(res => {
      if (res.Status == 1) {
        this.vacationTypes = res.Result.filter(e => e.istrip == true);
      }
      console.log(this.vacationTypes);
    })
    // console.log(this.excuseForm);
  }

  getSelectedTypeText() {
    return jQuery("#sel_VacationType option:selected").text();
  }
  getTotalDays() {
    let vac_fdate = (new Date(this.vacationForm.vac_fdateF)).ToOADate();
    let vac_tdate = (new Date(this.vacationForm.vac_tdateF)).ToOADate();

    if (vac_fdate > vac_tdate)
      return 0;
    else
      return (vac_tdate - vac_fdate) + 1
  }
  canAddVac() {
    this.vacationForm.vac_fdate = (new Date(this.vacationForm.vac_fdateF)).ToOADate();
    this.vacationForm.vac_tdate = (new Date(this.vacationForm.vac_tdateF)).ToOADate();

    this.spinner.show();

    
     this.api.post(AppSettings.WebApiUrl + 'SelfServices/Vacations/CanAdd', this.vacationForm, true).finally(() => {
          this.spinner.hide();
      }).subscribe((res: ResponseResult) => {
      if (res.Status) {
        this.message = jQuery("#VacationConfairmDiv").html();
        this.openForm();
      }
      else {
        this.ShowErrormsg(res.Msg);
      }

    }, (error: Response) => {
      this.ShowErrormsg(error.toString());
    })
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
    this.alert.okButtonText = this.translate.getValue('btOk');
    this.alert.cancelButtonText = this.translate.getValue('bt_close');
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

  onCloseAlert($event) {

    this.vacationForm.vac_fdate = (new Date(this.vacationForm.vac_fdateF)).ToOADate();
    this.vacationForm.vac_tdate = (new Date(this.vacationForm.vac_tdateF)).ToOADate();

    let formData: FormData = new FormData();
    if (this.fileAttach != null)
      formData.append('AttachmentFile', this.fileAttach, this.fileAttach.name);

    formData.append('vac_fdate', this.vacationForm.vac_fdate.toString());
    formData.append('vac_tdate', this.vacationForm.vac_tdate.toString());
    formData.append('vac_type', this.vacationForm.vac_type);
    formData.append('vac_empid', this.vacationForm.vac_empid.toString());
    formData.append('vac_reason', this.vacationForm.vac_reason);
    formData.append('SelectedTypeText', this.getSelectedTypeText());
    formData.append('TotalDays', this.getTotalDays().toString());


   
    let apiUrl1 = AppSettings.WebApiUrl + 'SelfServices/Vacations/Add';

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
          this.ShowErrormsg(res.Msg);

        }
      }, (error: Response) => {

      })
    // this.busy = this.api.post(AppSettings.WebApiUrl + 'SelfServices/Vacations/Add', this.vacationForm, true).subscribe((res: ResponseResult) => {
    //   if (res.Status) {
    //     console.log('done');
    //     jQuery("#vacationrequest").hide();
    //     $('html, body').animate({ scrollTop: 0 }, 'slow');
    //     jQuery("#msgsuccess").slideDown("100");
    //   }
    //   else {
    //     jQuery("#vacationrequest").hide();
    //     $('html, body').animate({ scrollTop: 0 }, 'slow');
    //     jQuery("#Vacationerrorcontent").html(res.Msg);
    //     jQuery("#ErrorMsg").slideDown("100");
    //   }

    // }, (error: Response) => {
    //   jQuery("#vacationrequest").hide();
    //   $('html, body').animate({ scrollTop: 0 }, 'slow');

    //   jQuery("#ErrorMsg").slideDown("100");

    // })


  }

  onOpenAlert() { }

  onDismissAlert() { }

  submit() {
    this.HideErrormsg();

    let totexecTime = this.getTotalDays();

    //console.log(totexecTime);
    if (totexecTime == 0) {
      this.ShowErrormsg("الرجاء التحقق من تاريخ الإجازة");
      return;
    }
    else {
      this.canAddVac();

    }
    // else {
    //   console.log(this.vacationForm);
    //   this.message = jQuery("#VacationConfairmDiv").html();
    //   this.openForm();
    // }
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
        this.ShowErrormsg(this.translate.getValue('FilesizeErr'));
      }
    }
  }

}
