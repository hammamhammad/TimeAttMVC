import { AppSettings } from './../shared/global.settings';
import { APIRestFulService } from './../shared/apiRestful.service';
import { UserTokenInfo } from './../shared/usertokeninfo';
import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbTabset } from '../Tap/tab.component';
import { MyReportComponent } from './my-report/my-report.component';
import { MgrReportComponent } from './mgr-report/mgr-report.component';
import { LodingSpinnerService } from '../shared/loadingspinner.service';
import { Subscription, finalize } from 'rxjs';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit {

  constructor(private router: Router,private api: APIRestFulService,
    private authService: AuthService, private spinner: LodingSpinnerService) { }
  UserInfo!: UserTokenInfo|null;
  isManager=false;

  @ViewChild(MgrReportComponent) mgrattreport: MgrReportComponent | undefined;
  @ViewChild(MyReportComponent) myattreport: MyReportComponent| undefined;
  @ViewChild(NgbTabset) Tabset: NgbTabset | undefined;

  ngOnInit() {
     this.UserInfo = this.authService.UserInfo();
    // if (this.UserInfo == null) {
    //   this.router.navigate(['login']);
    // }

  }

  ngAfterViewInit() {
    //if (this.UserInfo != null) {
      console.log("info")
      console.log(this.UserInfo)
      console.log(this.UserInfo!.UserEmpID!)
      console.log(this.myattreport)
      
      this.myattreport!.MyTimeForm.Emp_ID = this.UserInfo!.UserEmpID!
      this.myattreport!.LoadEvent()
      this.myattreport!.getMyAtt()
      this.IsManager();
    //}
  }
  
  
  busy!: Subscription;
IsManager(){

    
  this.spinner.show();

 
   this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/IsManager').pipe(
    finalize(() => this.spinner.hide())
  ).subscribe(res => {
    console.log(res)
     // if (res.Status == 1) {
        this.isManager = res.Result;
     // }
    })
}
 

}

