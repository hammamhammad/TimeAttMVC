import { AuthService } from './../../shared/auth.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserTokenInfo } from '../../shared/usertokeninfo';
import { Subscription, Subject } from 'rxjs';
import { APIRestFulService } from '../../shared/apiRestful.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isNumeric } from 'jquery';
import { LodingSpinnerService } from '../../shared/loadingspinner.service';
import { AppSettings } from '../../shared/global.settings';
import { DataTableDirective } from '../../datatable/angular-datatables.directive';

@Component({
  selector: 'app-violation',
  templateUrl: './violation.component.html',
  styleUrls: ['./violation.component.css']
})
export class ViolationComponent implements OnInit, AfterViewInit {

  UserInfo: UserTokenInfo;
  message: string;
  busy: Subscription;
  taskID;
  AbsenceList;
  LateList;
  ViolationList;
  CompanyName ;
  PeriodStart;
  PeriodEnd;
  responseMSG;

  constructor(private api: APIRestFulService, private router: Router, private actRouter: ActivatedRoute,
    private authService: AuthService, private spinner: LodingSpinnerService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.actRouter.paramMap.subscribe(params => {
      this.taskID = params.get('taskid');

      if (isNumeric(params.get('taskid'))) {
        this.taskID = parseInt(params.get('taskid'));
      }
      else
        this.router.navigate(['**']);
    })

    if (this.taskID !== null) {
      this.FillViolationTables();
    }
    else
      this.router.navigate(['**']);

    this.dtOptionsAbsenceTable = {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
      rowId: 'user_id',
      dom: `<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>t<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>`,
      language: AppSettings.DataTableLanguage,
      searching: true,
      info: true,
      autoWidth: false,
      ordering: false,
    }

    this.dtOptionsLateTable = {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
      rowId: 'user_id',
      dom: `<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>t<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>`,
      language: AppSettings.DataTableLanguage,
      searching: true,
      info: true,
      autoWidth: false,
      ordering: false,
    }

    this.dtOptionsViolationTable = {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
      rowId: 'user_id',
      dom: `<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>t<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>`,
      language: AppSettings.DataTableLanguage,
      searching: true,
      info: true,
      autoWidth: false,
      ordering: false,
    }

  }
  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }

  @ViewChild('AbsenceTable') AbsenceTable: DataTableDirective;
  dtOptionsAbsenceTable: DataTables.Settings = {};
  dtTriggerAbsenceTable: Subject<any> = new Subject();
  isRenderAbsenceTable = false;

  @ViewChild('LateTable') LateTable: DataTableDirective;
  dtOptionsLateTable: DataTables.Settings = {};
  dtTriggerLateTable: Subject<any> = new Subject();
  isRenderLateTable = false;

  @ViewChild('ViolationTable') ViolationTable: DataTableDirective;
  dtOptionsViolationTable: DataTables.Settings = {};
  dtTriggerViolationTable: Subject<any> = new Subject();
  isRenderViolationTable = false;

  FillViolationTables() {
    this.spinner.show();

    this.api.getRequestAS(AppSettings.WebApiUrl + 'workflow/GetViolationTaskDetails/' + this.taskID).finally(() => {
      this.spinner.hide();
    }).subscribe(res => {
      if (res.Status == 1) {

        this.CompanyName = res.Result.CompanyName;
        this.PeriodStart= res.Result.PeriodStart;
        this.PeriodEnd= res.Result.PeriodEnd;
        
        //Fill Absence Table
        this.AbsenceList = res.Result.Absences;

        if (!this.isRenderAbsenceTable) {

          this.dtTriggerAbsenceTable.next();
          this.isRenderAbsenceTable = true;

        } else {
          this.AbsenceTable.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.rows().clear();
            dtInstance.destroy();
            // Call the dtUGTrigger to rerender Group Table again
            setTimeout(function () {
              this.dtTriggerAbsenceTable.next();
            }.bind(this), 300);
          });
        }

        //Fill Late Table 
        this.LateList = res.Result.Lateness;

        if (!this.isRenderLateTable) {

          this.dtTriggerLateTable.next();
          this.isRenderLateTable = true;

        } else {
          this.LateTable.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.rows().clear();
            dtInstance.destroy();
            // Call the dtUGTrigger to rerender Group Table again
            setTimeout(function () {
              this.dtTriggerLateTable.next();
            }.bind(this), 300);
          });
        }


        //Fill Violations Table
        this.ViolationList = res.Result.Violations;

        if (!this.isRenderViolationTable) {

          this.dtTriggerViolationTable.next();
          this.isRenderViolationTable = true;

        } else {
          this.ViolationTable.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.rows().clear();
            dtInstance.destroy();
            // Call the dtUGTrigger to rerender Group Table again
            setTimeout(function () {
              this.dtTriggerViolationTable.next();
            }.bind(this), 300);
          });
        }

      }
      else {
        this.responseMSG = res.Msg;
      }
    })
  }
}
