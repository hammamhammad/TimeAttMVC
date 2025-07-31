import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { APIRestFulService } from '../../shared/apiRestful.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { Notifications } from '../../shared/notifications';
import { LodingSpinnerService } from '../../shared/loadingspinner.service';
import { TranslateService } from '../../shared/TranslateModule';
import { AppSettings } from '../../shared/global.settings';
import { UserTokenInfo } from '../../shared/usertokeninfo';
import { AlertMsgComponent } from '../../Modals/modal.module';
import { ResponseResult } from '../../shared/responseresult';
import { Observable } from 'rxjs';

@Component({
  selector: 'mgr-addtransaction',
  templateUrl: './mgr-addtransaction.component.html',
  styleUrls: ['./mgr-addtransaction.component.css']
})
export class MgrAddtransactionComponent implements OnInit, AfterViewInit {

  constructor(private api: APIRestFulService, private router: Router,
    private authService: AuthService, private spinner: LodingSpinnerService,
    private _notifcation: Notifications, private translate: TranslateService) { }


    Select2OptionsGroup?: Select2Options;
    localEmployeedata: Array<IdTextPair> = null;
    employeesListData;
    localEmp: { emp_id: 0,emp_name:'' };

  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }
  ngOnInit() {
    this.UserInfo = this.authService.UserInfo();

    this.transFormMGR.emp_id = this.UserInfo.UserEmpID;
    this.GetReasons();

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
    this.localEmployeedata = null;
    this.localEmp = { emp_id: 0 ,emp_name:''};
  }

  ngAfterViewInit() {
    setTimeout(function () {
      this.getEmployees();
    }.bind(this), 300);
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


  reasons;
  UserInfo: UserTokenInfo;
  message: string;
  fileAttach = null;


  @ViewChild('alert') alert: AlertMsgComponent;

  transFormMGR = {
    transDate: '',
    DateNo: 0,
    m_transtype: null,
    m_timeF: '',
    m_time: '',
    ModifiedReasonID: null,
    Note: '',
    emp_id: 0,
    TaskDetails: '',
    trans_Attach: null,
    emp_name: ''

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
    this.transFormMGR.emp_id = this.localEmp.emp_id[0];
    this.transFormMGR.emp_name= this.localEmp.emp_name;

    this.transFormMGR.DateNo = (new Date(this.transFormMGR.transDate)).ToOADate();
    this.transFormMGR.m_time = this.transFormMGR.m_timeF;
    this.transFormMGR.m_time = this.transFormMGR.m_time.replace(':', '-');
    this.spinner.show();
    this.api.getRequest(AppSettings.WebApiUrl + 'SelfServices/Trans/CanManagerAddTransaction/' + this.transFormMGR.emp_id + '/' + this.transFormMGR.DateNo + '/' + this.transFormMGR.m_time + '/' + this.transFormMGR.m_transtype).finally(() => {
      this.spinner.hide();
    }).subscribe((res: ResponseResult) => {
      if (res.Status) {
        this.message = jQuery("#transConfairmDiv_mgr").html();
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

    setTimeout(function () {
      this.alert.openDynamic(null, 'md');//md,sm,lg
    }.bind(this), 200);
  }

  onCloseAlert($event) {


    let formData: FormData = new FormData();

    if (this.fileAttach != null)
      formData.append('AttachmentFile', this.fileAttach, this.fileAttach.name);
;
    formData.append('emp_id', this.transFormMGR.emp_id.toString());
    formData.append('emp_name', this.transFormMGR.emp_name.toString());

    formData.append('DateNo', this.transFormMGR.DateNo.toString());
    formData.append('m_transtype', this.transFormMGR.m_transtype);
    formData.append('m_time', this.transFormMGR.m_time);
    formData.append('ModifiedReasonID', this.transFormMGR.ModifiedReasonID);
    formData.append('Note', this.transFormMGR.Note);
    formData.append('SelectedTranTypeText', this.getSelectedTranTypeText());
    formData.append('SelectedReasonText', this.getSelectedReasonText());



    let apiUrl1 = AppSettings.WebApiUrl + 'SelfServices/Trans/ManagerAddTransByEmpWithAttach';
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
    return jQuery("#ddlexecusetype_mgr option:selected").text()
    //return jQuery("label[for='" + jQuery('input[name="execusetype"]:checked').attr("id") + "']").text();
  }



  ShowExecuseErrormsg(msg) {
    jQuery("#errtransmsg_mgr").html(msg);

    jQuery("#errtransmsg_mgr").fadeIn(200);
  }
  HideExecuseErrormsg() {
    jQuery("#errtransmsg_mgr").hide();
  }
}
