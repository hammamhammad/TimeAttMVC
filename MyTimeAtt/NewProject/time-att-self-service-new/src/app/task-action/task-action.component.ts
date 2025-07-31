import { ResponseResult } from './../shared/responseresult';
import { AppSettings } from './../shared/global.settings';
import { AlertMsgComponent } from './../Modals/alert.component';
import { UserTokenInfo } from './../shared/usertokeninfo';
import { TranslateService } from './../shared/TranslateService';
import { AuthService } from './../shared/auth.service';
import { APIRestFulService } from './../shared/apiRestful.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Notifications } from '../shared/notifications';
import { LodingSpinnerService } from '../shared/loadingspinner.service';
import { Subscription, finalize } from 'rxjs';
import { isNumeric } from 'jquery';


//import { ActivatedRoute } from '@angular/router/src/router_state';

@Component({
  selector: 'app-task-action',
  templateUrl: './task-action.component.html',
  styleUrls: ['./task-action.component.css']
})
export class TaskActionComponent implements OnInit, AfterViewInit {

  UserInfo!: UserTokenInfo;
  message!: string;
  busy!: Subscription;
  @ViewChild('alert')
  alert!: AlertMsgComponent;
  taskID: any;
  TaskInfo:any;
  TaskHistory: any;
  TaskDetails: any;
  actionType!: string;
  tasknote = '';
  responseMSG: any;
  AttachURL:any|null=null;


  constructor(private api: APIRestFulService, private router: Router, private actRouter: ActivatedRoute,
    private authService: AuthService, private translate: TranslateService, private _notifcation: Notifications, private spinner: LodingSpinnerService) { }

  ngOnInit() {
    this.UserInfo = this.authService.UserInfo()!;
    // if (this.UserInfo == null) {
    //   this.router.navigate(['login']);
    // }
  }
  taskview!: string | null;
  ngAfterViewInit() {
    this.actRouter.paramMap.subscribe(params => {
      this.taskview = params.get('taskview');

      if (isNumeric(params.get('taskid'))) {
        this.taskID = parseInt(params.get('taskid')!);
      }
      else
        this.router.navigate(['**']);
    })
    if (this.taskview == null) {
      this.FillActionTaskDetails();
    }
    else if (this.taskview === "1") {
      this.FillActionTaskDetailsView();
    }
    else
      this.router.navigate(['**']);
    // else
    //   this.excuseForm.exc_empid = this.UserInfo.UserEmpID;
  }

  GetClassName(val: any) {
    switch (val) {
      case 7:
        return "TaskApp";
      case 8:
        return "TaskRej";
      case 10:
        return "TaskCan";
      case 1:
        return "TaskPen";
      case 3:
        return "TaskRej";
      case 2:
        return "TaskApp";
        default:
          return;
    }
  }
  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }

  FillActionTaskDetails() {
    this.spinner.show();

   
     this.api.getRequestAS(AppSettings.WebApiUrl + 'workflow/GetTaskDetails/' + this.taskID) .pipe(
      finalize(() => this.spinner.hide())
      ).subscribe((res: { Status: number; Result: any; Msg: any; }) => {
      if (res.Status == 1) {
        this.TaskInfo = res.Result;
        this.TaskHistory = this.TaskInfo.TaskHistoryDetails;
        this.TaskDetails = this.TaskInfo.TaskDetails;
        this.AttachURL = this.TaskInfo.TaskDetails.FileData != null ? (AppSettings.WebApiUrl + 'workflow/GetTaskAttach/'+ this.taskID) : null;

      }
      else {
        this.responseMSG = res.Msg;
      }
    })
  }

  FillActionTaskDetailsView() {
    this.spinner.show();


     this.api.getRequestAS(AppSettings.WebApiUrl + 'workflow/GetTaskDetailsView/' + this.taskID).pipe(
      finalize(() => this.spinner.hide())
  ).subscribe((res: { Status: number; Result: any; Msg: any; }) => {
      if (res.Status == 1) {
        this.TaskInfo = res.Result;
        this.TaskHistory = this.TaskInfo.TaskHistoryDetails;
        this.TaskDetails = this.TaskInfo.TaskDetails;
      }
      else {
        this.responseMSG = res.Msg;
      }
    })
  }

  btnApproveAction() {
    this.actionType = 'approve';
    this.message = this.translate.getValue('SureApprove')
    this.openForm();
  }

  ShowRejectErrormsg(msg: string | Document | Element | Comment | DocumentFragment | ((this: HTMLElement, index: number, oldhtml: string) => string | JQuery.Node)) {
    jQuery("#Rejecterrmsg").html(msg);

    jQuery("#Rejecterrmsg").fadeIn(200);
  }
  HideRejectErrormsg() {
    jQuery("#Rejecterrmsg").hide();
  }

  btnRejectAction() {
    this.HideRejectErrormsg();
    if (this.tasknote == '') {
      this.ShowRejectErrormsg(this.translate.getValue('RejectReson'))
      return;
    }
    this.actionType = 'reject';
    this.message = this.translate.getValue('SureReject')
    this.openForm();
  }

  RejectAction() {
    var TaskData = {
      TaskID: this.taskID,
      TaskNote: this.tasknote,
    };
    this.spinner.show();

   
    this.api.post(AppSettings.WebApiUrl + 'workflow/RejectActivity', TaskData, true).pipe(
      finalize(() => this.spinner.hide())
      ).subscribe((res: ResponseResult) => {
      if (res.Status) {
        // jQuery("#Actiondetailsdiv").hide();
        // jQuery("#taskerrorcontent").html(this.translate.getValue('RejectCompleteOK'));
        // jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
        // jQuery("#TaskActionmsgerror").fadeIn(50);
        this._notifcation.showSuccess('', this.translate.getValue('RejectCompleteOK'));
        this.router.navigate(['mytasks']);
      }
      else {
        // jQuery("#Actiondetailsdiv").hide();
        // jQuery("#taskerrorcontent").html(res.Msg);
        // jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
        // jQuery("#TaskActionmsgerror").fadeIn(50);
        this._notifcation.showError('', res.Msg);
      }
    })
  }

  ApproveAction() {
    var TaskData = {
      TaskID: this.taskID,
      TaskNote: this.tasknote
    };
    this.spinner.show();


     this.api.post(AppSettings.WebApiUrl + 'workflow/ApproveActivity', TaskData, true).pipe(
      finalize(() => this.spinner.hide())
  ).subscribe((res: ResponseResult) => {
      if (res.Status) {
        // jQuery("#Actiondetailsdiv").hide();
        // jQuery("#taskerrorcontent").html(this.translate.getValue('ApproveCompleteOK'));
        // jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
        // jQuery("#TaskActionmsgerror").fadeIn(50);
        this._notifcation.showSuccess('', this.translate.getValue('ApproveCompleteOK'));
        this.router.navigate(['mytasks']);
      }
      else {
        // jQuery("#Actiondetailsdiv").hide();
        // jQuery("#taskerrorcontent").html(res.Msg);
        // jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
        // jQuery("#TaskActionmsgerror").fadeIn(50);
        this._notifcation.showError('', res.Msg);
      }
    });

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
    setTimeout( () => {
      this.alert.openDynamic(null, 'md');//md,sm,lg
    }, 200);
  }

  onCloseAlert($event: any) {
    if (this.actionType == 'approve')
      this.ApproveAction();
    else if (this.actionType == 'reject')
      this.RejectAction();

  }
  onOpenAlert() { }

  onDismissAlert() { }
}
