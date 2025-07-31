import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError, finalize, Observable, startWith, map } from 'rxjs';
import { AlertMsgComponent } from 'src/app/Modals/alert.component';
import { TranslateService } from 'src/app/shared/TranslateService';
import { APIRestFulService } from 'src/app/shared/apiRestful.service';
import { AuthService } from 'src/app/shared/auth.service';
import { AppSettings } from 'src/app/shared/global.settings';
import { LodingSpinnerService } from 'src/app/shared/loadingspinner.service';
import { Notifications } from 'src/app/shared/notifications';
import { ResponseResult } from 'src/app/shared/responseresult';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserTokenInfo } from 'src/app/shared/usertokeninfo';

@Component({
  selector: 'app-mgr-remote-work-request',
  templateUrl: './mgr-remote-work-request.component.html',
  styleUrls: ['./mgr-remote-work-request.component.css']
})
export class MgrRemoteWorkRequestComponent implements OnInit, AfterViewInit {
  remoteWorkForm: FormGroup;
  @ViewChild('alert') alert!: AlertMsgComponent;
  message!: string;
  localEmployeedata: Array<IdTextPair>|null = null;
  employeesListData!: any[];
  public EmployeeCtrl: FormControl = new FormControl();
  filteredEmployees: Observable<IdTextPair[]>=new Observable<IdTextPair[]>;
  user!: UserTokenInfo | null;
 
  constructor(private fb: FormBuilder, private api: APIRestFulService, private router: Router,
    private authService: AuthService,
    private _notifcation: Notifications, private translate: TranslateService, private http: HttpClient, private spinner: LodingSpinnerService) {

  
    this.remoteWorkForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      notes: ['']
    });
  
  }
  ngOnInit(): void {
    this.EmployeeCtrl.setValue("");
    this.localEmployeedata = null;

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
    this.CanAddExecuse_MGR();
  }
  ngAfterViewInit() {
    setTimeout( () => {
      this.getEmployees();
    }, 300);
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
    console.log(this.localEmployeedata)
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

  ShowExecuseErrormsg(msg :string) {
    jQuery("#errexecusemsg").html(msg);

    jQuery("#errexecusemsg").fadeIn(200);
  }
  HideExecuseErrormsg() {
    jQuery("#errexecusemsg").hide();
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

  displayFn(user: IdTextPair): string {
    return user && user.text ? user.text : '';
  }

  onCloseAlert() {

    if (this.remoteWorkForm.valid) {
      var excuseForm = {
        exc_empid: this.EmployeeCtrl.value.id,
        exc_name: this.EmployeeCtrl.value.text,
        exc_reason: this.remoteWorkForm.value.notes,
        exc_ftime: jQuery('#exc_ftime').val(),
        exc_ttime: jQuery('#exc_ttime').val(),
        exc_type: 3,
        exc_date: new Date(this.remoteWorkForm.value.startDate).ToOADate(),
        exc_todate: new Date(this.remoteWorkForm.value.endDate).ToOADate(),
        execuseReason_ID: 4,
        exc_TotalTime : this.CalculateExecuseHours(),
        TaskDetails : jQuery("#ExecBodyDiv").html()
      };
   
    let apiUrl1 = AppSettings.WebApiUrl + 'SelfServices/WorkRemote/ManagerAddExecuse';
  
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
  getShiftInfo(): void {
    this.spinner.show();

    var date = new Date(this.remoteWorkForm.value.startDate).ToOADate()
    this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/Excuse/GetShiftInfo/'+ date +'/' + this.EmployeeCtrl.value.id).pipe(
      finalize(() => this.spinner.hide()))
    .subscribe((res:any) => {
       console.log(res)
      if (res.Status == 1) {
        jQuery('#exc_ftime').val(res.Result.shift_fin);
        jQuery('#exc_ttime').val(res.Result.shift_sout != '--:--' ? res.Result.shift_sout : res.Result.shift_fout);
      }
    })
   
  }

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

   CanAddExecuse_MGR() {
    var strEmpinfo = localStorage.getItem("empinfo");
    var empinfo;
    if (strEmpinfo) {
      empinfo = JSON.parse(strEmpinfo)
    }
    var type = 3;
    var excuseForm = {
      exc_empid: this.EmployeeCtrl.value.id,
      exc_ftime: jQuery('#exc_ftime').val(),
      exc_ttime: jQuery('#exc_ttime').val(),
      exc_type: type,
      exc_date: new Date(this.remoteWorkForm.value.startDate).ToOADate(),
      exc_todate: new Date(this.remoteWorkForm.value.endDate).ToOADate(),
      execuseReason_ID: 4
    };
    this.spinner.show()
    this.api.post(AppSettings.WebApiUrl + 'SelfServices/Excuse/CanManagerAddExecuse', excuseForm, true).pipe(
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
   
  }
 
}
