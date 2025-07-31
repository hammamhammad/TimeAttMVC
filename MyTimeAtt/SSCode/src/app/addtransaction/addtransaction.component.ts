import { ResponseResult } from './../shared/responseresult';
import { AppSettings } from './../shared/global.settings';
import { AlertMsgComponent } from './../Modals/alert.component';
import { Subscription } from 'rxjs/Subscription';
import { UserTokenInfo } from './../shared/usertokeninfo';
import { AuthService } from './../shared/auth.service';
import { Router } from '@angular/router';
import { APIRestFulService } from './../shared/apiRestful.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '../shared/TranslateService';
import { Notifications } from '../shared/notifications';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LodingSpinnerService } from '../shared/loadingspinner.service';
@Component({
  selector: 'addtransaction',
  templateUrl: './addtransaction.component.html',
  styleUrls: ['./addtransaction.component.css']
})
export class AddtransactionComponent implements OnInit {

  constructor(private api: APIRestFulService, private router: Router,
    private authService: AuthService, private spinner: LodingSpinnerService,
    private _notifcation: Notifications, private translate: TranslateService, private http: Http) { }

  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }
  ngOnInit() {
    this.UserInfo = this.authService.UserInfo();
    // if (this.UserInfo == null) {
    //   this.router.navigate(['login']);
    // }
    // else {
    this.transForm.emp_id = this.UserInfo.UserEmpID;
    this.GetReasons();
    //}
  }
  reasons;
  UserInfo: UserTokenInfo;
  message: string;
  busy: Subscription;
  fileAttach = null;


  @ViewChild('alert') alert: AlertMsgComponent;

  transForm = {
    transDate: '',
    DateNo: 0,
    m_transtype: null,
    m_timeF: '',
    m_time: '',
    ModifiedReasonID: null,
    Note: '',
    emp_id: 0,
    TaskDetails: '',
    trans_Attach: null

  }
  onDateChange(e, d) {
  }
  getSelectedReasonText() {
    return jQuery("#ddexcexuserequestreson option:selected").text();
  }
  GetReasons() {
    this.spinner.show();
    this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/Trans/Reasons/GetAll').finally(() => {
      this.spinner.hide();
  }).subscribe(res => {
      if (res.Status == 1) {
        this.reasons = res.Result;
      }
      console.log(this.reasons);
    })
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

  submit() {
    this.HideExecuseErrormsg();
    this.canAddExc();
  }

  canAddExc() {
    // let dd=new Date(parseInt(this.transForm.transDate.split('-')[0],10),parseInt(this.transForm.transDate.split('-')[1],10)-1,parseInt(this.transForm.transDate.split('-')[2],10));
    // this.transForm.DateNo = dd.ToOADate();
    this.transForm.DateNo = (new Date(this.transForm.transDate)).ToOADate();
    this.transForm.m_time = this.transForm.m_timeF;
    this.transForm.m_time = this.transForm.m_time.replace(':', '-');
    this.spinner.show();
    this.api.getRequest(AppSettings.WebApiUrl + 'SelfServices/Trans/CanAddTransaction/' + this.transForm.DateNo + '/' + this.transForm.m_time + '/' + this.transForm.m_transtype).finally(() => {
      this.spinner.hide();
  }).subscribe((res: ResponseResult) => {
      if (res.Status) {
        this.message = jQuery("#transConfairmDiv").html();
        this.openForm();
      }
      else {
        //this._notifcation.showError('', res.Msg );
        this.ShowExecuseErrormsg(res.Msg);
      }

    }, (error: Response) => {
      this._notifcation.showError('', error.toString());
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

  onCloseAlert($event) {
    this.transForm.TaskDetails = jQuery("#ExecBodyDiv").html();

    let formData: FormData = new FormData();
   
    if (this.fileAttach != null)
      formData.append('AttachmentFile', this.fileAttach, this.fileAttach.name);

    formData.append('DateNo', this.transForm.DateNo.toString());
    formData.append('m_transtype', this.transForm.m_transtype);
    formData.append('m_time', this.transForm.m_time);
    formData.append('ModifiedReasonID', this.transForm.ModifiedReasonID);
    formData.append('Note', this.transForm.Note);
    formData.append('emp_id', this.transForm.emp_id.toString());
    formData.append('SelectedTranTypeText', this.getSelectedTranTypeText());
    formData.append('SelectedReasonText', this.getSelectedReasonText());


   
    let apiUrl1 = AppSettings.WebApiUrl + 'SelfServices/Trans/AddTransByEmpWithAttach';
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
          this.ShowExecuseErrormsg(res.Msg);
        }
  
      }, (error: Response) => {


        })

    // this.busy = this.api.post(AppSettings.WebApiUrl + 'SelfServices/Trans/AddTransByEmp', this.transForm, true).subscribe((res: ResponseResult) => {
    //   if (res.Status) {
    //     this._notifcation.showSuccess('', this.translate.getValue('Yourrequestimplementedsuccessfully'));
    //     this.router.navigate(['myrequests']);
    //   }
    //   else {
    //     this.ShowExecuseErrormsg(this.translate.getValue('AddExcuseErrorMsg'))
    //   }

    // }, (error: Response) => {

    // })

  }

  onOpenAlert() { }

  onDismissAlert() { }

  getSelectedTranTypeText() {
    return jQuery("#ddlexecusetype option:selected").text()
    //return jQuery("label[for='" + jQuery('input[name="execusetype"]:checked').attr("id") + "']").text();
  }



  ShowExecuseErrormsg(msg) {
    jQuery("#errtransmsg").html(msg);

    jQuery("#errtransmsg").fadeIn(200);
  }
  HideExecuseErrormsg() {
    jQuery("#errtransmsg").hide();
  }
}
