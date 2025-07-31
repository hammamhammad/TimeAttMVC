import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APIRestFulService } from '../../shared/apiRestful.service';
import { AuthService } from '../../shared/auth.service';
import { LodingSpinnerService } from '../../shared/loadingspinner.service';
import { UserTokenInfo } from '../../shared/usertokeninfo';
import { MgrAddtransactionComponent } from '../mgr-addtransaction/mgr-addtransaction.component';
import { AddtransactionComponent } from '../addtransaction.component';
import { NgbTabset } from '../../Tap/tab.modal';
import { AppSettings } from '../../shared/global.settings';

@Component({
  selector: 'main-addtransaction',
  templateUrl: './main-addtransaction.component.html',
  styleUrls: ['./main-addtransaction.component.css']
})
export class MainAddtransactionComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private api: APIRestFulService,
    private authService: AuthService, private spinner: LodingSpinnerService) { }
  UserInfo: UserTokenInfo;
  isManager = false;

  @ViewChild(MgrAddtransactionComponent) mgrTrans: MgrAddtransactionComponent;
  @ViewChild(AddtransactionComponent) myTrans: AddtransactionComponent;
  @ViewChild(NgbTabset) Tabset: NgbTabset;

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


    this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/IsManager').finally(() => {
      this.spinner.hide();
    }).subscribe(res => {
      // if (res.Status == 1) {
      this.isManager = res.Result;
      // }
    })
  }
  TabChange($event) {

  }

}
