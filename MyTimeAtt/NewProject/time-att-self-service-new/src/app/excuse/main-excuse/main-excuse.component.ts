import { MgrExcuseComponent } from './../mgr-excuse/mgr-excuse.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APIRestFulService } from '../../shared/apiRestful.service';
import { LodingSpinnerService } from '../../shared/loadingspinner.service';
import { AuthService } from '../../shared/auth.service';
import { UserTokenInfo } from '../../shared/usertokeninfo';
import { NgbTabset } from '../../Tap/tab.modal';
import { ExcuseComponent } from '../excuse.component';
import { AppSettings } from '../../shared/global.settings';
import { finalize } from 'rxjs';

@Component({
  selector: 'main-excuse',
  templateUrl: './main-excuse.component.html',
  styleUrls: ['./main-excuse.component.css']
})
export class MainExcuseComponent implements OnInit, AfterViewInit {
TabChange($event: any) {
}

  constructor(private router: Router, private api: APIRestFulService,
    private authService: AuthService, private spinner: LodingSpinnerService) { }
  UserInfo!: UserTokenInfo |null;
  isManager = false;

  @ViewChild(MgrExcuseComponent) mgrExcuse!: MgrExcuseComponent;
  @ViewChild(ExcuseComponent) myExcuse!: ExcuseComponent;
  @ViewChild(NgbTabset) Tabset!: NgbTabset;

  ngOnInit() {
    this.UserInfo = this.authService.UserInfo();
    // if (this.UserInfo == null) {
    //   this.router.navigate(['login']);
    // }

  }

  ngAfterViewInit() {
    //if (this.UserInfo != null) {
    // this.myattreport.MyTimeForm.Emp_ID = this.UserInfo.UserEmpID;
    // this.myattreport.LoadEvent();
    // this.myattreport.getMyAtt();
    this.IsManager();
    //}
  }

  IsManager() {


    this.spinner.show();


    // this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/IsManager').finally(() => {
    //   this.spinner.hide();
    // }).subscribe(res => {
    //   // if (res.Status == 1) {
    //   this.isManager = res.Result;
    //   // }
    // })
    this.api.getRequestAS(`${AppSettings.WebApiUrl}SelfServices/IsManager`).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe(res => {
      this.isManager = res.Result;
    });
  }


}
