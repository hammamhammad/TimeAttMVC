import { TranslateService } from './../shared/TranslateService';
import { ResponseResult } from './../shared/responseresult';
import { AppSettings } from './../shared/global.settings';
import { AlertMsgComponent } from './../Modals/alert.component';
import { Subscription } from 'rxjs/Subscription';
import { isNumeric } from "rxjs/util/isNumeric"
import { UserTokenInfo } from './../shared/usertokeninfo';
import { AuthService } from './../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { APIRestFulService } from './../shared/apiRestful.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { isNumber } from 'util';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Notifications } from '../shared/notifications';
import { LodingSpinnerService } from '../shared/loadingspinner.service';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})

export class TaskDetailsComponent implements OnInit, AfterViewInit {


  UserInfo: UserTokenInfo;
  message: string;
  busy: Subscription;
  @ViewChild('alert') alert: AlertMsgComponent;
  taskID;
  TaskInfo;
  TaskHistory;
  TaskDetails;
  responseMSG;
  AttachURL=null;

  constructor(private api: APIRestFulService, private router: Router, private actRouter: ActivatedRoute,
    private authService: AuthService, private translate: TranslateService, private _notifcation: Notifications, private spinner: LodingSpinnerService) { }

  ngOnInit() {
    this.UserInfo = this.authService.UserInfo();
    // if (this.UserInfo == null) {
    //   this.router.navigate(['login']);
    // }

  }
  ngAfterViewInit() {
    this.actRouter.paramMap.subscribe(params => {
      if (isNumeric(params.get('taskid'))) {
        this.taskID = parseInt(params.get('taskid'));
      }
      else
        this.router.navigate(['**']);
    })
    this.FillActionTaskDetails();
    // else
    //   this.excuseForm.exc_empid = this.UserInfo.UserEmpID;
  }

  GetClassName(val) {
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
    }
  }

  readResource(con) {
    con.children().each(function () {
      if ($(this).attr('res-type') == 'H')
        $(this).html(this.translate.getValue([$(this).attr('res-name')]));
      else if ($(this).attr('res-type') == 'P')
        $(this).attr('placeholder', this.translate.getValue[$(this).attr('res-name')]);
      else if ($(this).attr('res-type') == 'T')
        $(this).attr('title', this.translate.getValue[$(this).attr('res-name')]);
      else if ($(this).attr('res-type') == 'V')
        $(this).val(this.translate.getValue[$(this).attr('res-name')]);
      else if ($(this).attr('res-type') == 'C')
        $(this).addClass(this.translate.getValue[$(this).attr('res-name')]);
      this.readResource($(this));
    });
  }

  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }
  FillActionTaskDetails() {
    this.spinner.show();

    
    this.api.getRequestAS(AppSettings.WebApiUrl + 'workflow/GetYourTaskDetails/' + this.taskID).finally(() => {
          this.spinner.hide();
      }).subscribe(res => {
      if (res.Status == 1) {
        this.TaskInfo = res.Result;
        this.TaskHistory = this.TaskInfo.TaskHistoryDetails;
        this.TaskDetails = this.TaskInfo.TaskDetails;
        this.AttachURL = this.TaskInfo.TaskDetails.FileData != null ? (AppSettings.WebApiUrl + 'workflow/GetTaskAttach/'+ this.taskID) : null;

        setTimeout(() => {
          this.readResource($('#TaskBodyDetails'));
        }, 200);

      }
      else {
        this.responseMSG = res.Msg;
      }
    })
  }

  CancelRequest() {
    //this.api.post(AppSettings.WebApiUrl + 'Excuses/AddByEmp', this.excuseForm, true).subscribe((res: ResponseResult) => {
      this.spinner.show();

    
    this.api.post(AppSettings.WebApiUrl + 'workflow/CancelActivity', this.taskID, true)  .finally(() => {
            this.spinner.hide();
        }).subscribe((res: ResponseResult) => {
      if (res.Status) {
        // jQuery("#Actiondetailsdiv").hide();
        // jQuery("#tasksuccesscontent").html(this.translate.getValue('CancelCompleteOK'));
        // jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
        // jQuery("#TaskActionmsgsuccess").slideDown("100");
        this.TaskDetails.CanCancel=false;
        this.TaskDetails.TaskStatus = 6;
        this._notifcation.showSuccess('', this.translate.getValue('CancelCompleteOK'));
      }
      else {
        // jQuery("#Actiondetailsdiv").hide();
        // jQuery("#taskerrorcontent").html(res.Msg);
        // jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
        // jQuery("#TaskActionmsgerror").fadeIn(50);
        this._notifcation.showSuccess('', res.Msg);
      }

    })
  }

  openForm() {
    this.alert.refID = 11;
    this.alert.actionName = 'add';
    this.alert.modalTitle = this.translate.getValue('ConfirmationMSG');

    this.alert.modalFooter = true; //show footer
    this.alert.modalMessage = true; //display message
    this.alert.message = this.translate.getValue('SureCncelRequest')
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
    this.CancelRequest();

  }
  onOpenAlert() { }

  onDismissAlert() { }
}
