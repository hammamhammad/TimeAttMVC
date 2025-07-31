import { Subject } from 'rxjs/Rx';
import { DataTableDirective } from './../datatable/angular-datatables.directive';
import { ResponseResult } from './../shared/responseresult';
import { AppSettings } from './../shared/global.settings';
import { Subscription } from 'rxjs/Subscription';
import { UserTokenInfo } from './../shared/usertokeninfo';
import { APIRestFulService } from './../shared/apiRestful.service';
import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LodingSpinnerService } from '../shared/loadingspinner.service';


@Component({
  selector: 'app-myrequests',
  templateUrl: './myrequests.component.html',
  styleUrls: ['./myrequests.component.css']
})
export class MyrequestsComponent implements OnInit, AfterViewInit {


  constructor(private api: APIRestFulService, private router: Router,
    private authService: AuthService, private spinner: LodingSpinnerService) { }

  UserInfo: UserTokenInfo;
  busy: Subscription;
  taskStatusList;
  myRequestsList;
  taskStatus = null;

  @ViewChild('MyRequestTable') MyRequestTable: DataTableDirective;
  dtOptionsMyRequestTable: DataTables.Settings = {};
  dtTriggerMyRequestTable: Subject<any> = new Subject();
  isRenderMyRequestTable = false;


  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }
  
  ngOnInit() {
     this.UserInfo = this.authService.UserInfo();
    // if (this.UserInfo == null) {
    //   this.router.navigate(['login']);
    // }
    // else
    //   this.excuseForm.exc_empid = this.UserInfo.UserEmpID;
  }
  ngAfterViewInit() {
    this.GetTaskStatus()

    this.dtOptionsMyRequestTable = {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
      rowId: 'user_id',
      dom: `<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>t<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>`,
      language: AppSettings.DataTableLanguage,
      searching: true,
      info: true,
      autoWidth: false,
      ordering: false,
      // columns: [{ data: "user_id" }, { data: "user_name" }, { data: "shortName" }, { data: "GroupName" }, { data: "active" }],
      // columnDefs: [
      //   { "targets": 0, "visible": false, "searchable": false, type: "num" },
      //   { "width": "30%", "targets": 1, "orderable": false, "searchable": true },
      //   { "width": "25%", "targets": 2, "orderable": false, "searchable": true },
      //   { "width": "25%", "targets": 3, "orderable": false, "searchable": true },

      // ],
      // rowCallback: (row: Node, data: any[] | Object, index: number) => {
      //   const self = this;
      //   $('tr', row).unbind('click');
      //   $('tr', row).bind('click', () => {
      //     self.zone.run(() => {
      //        self.UserSelectiontoviewDailyDetailsEMP("U", "U", data, index);
      //     });

      //   });
      //   return row;
      // }
    }

  }

  GetTaskStatus() {
    this.spinner.show();


     this.api.getRequest(AppSettings.WebApiUrl + 'workflow/GetTaskStatus').finally(() => {
      this.spinner.hide();
  }).subscribe((res: ResponseResult) => {
      if (res.Status) {
        this.taskStatusList = res.Result;
        this.GetMyRequests();
      }
      //console.log(this.reasons);
    })
    // console.log(this.excuseForm);
  }
  GetMyRequests() {
    this.spinner.show();


    this.api.getRequest(AppSettings.WebApiUrl + 'workflow/GetMyAllRequest/' + this.taskStatus).finally(() => {
      this.spinner.hide();
  }).subscribe((res: ResponseResult) => {
      if (res.Status) {
        this.myRequestsList = res.Result;
        if (!this.isRenderMyRequestTable) {

          this.dtTriggerMyRequestTable.next();
          this.isRenderMyRequestTable = true;
  
        } else {
          this.MyRequestTable.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.rows().clear();
            dtInstance.destroy();
            // Call the dtUGTrigger to rerender Group Table again
            setTimeout(function () {
              this.dtTriggerMyRequestTable.next();
            }.bind(this), 300);
          });
        }
      }
      //console.log(this.reasons);
    })
    // console.log(this.excuseForm);
  }
  onCloseAlert($event){}
  onOpenAlert(){}
  onDismissAlert(){}
}
