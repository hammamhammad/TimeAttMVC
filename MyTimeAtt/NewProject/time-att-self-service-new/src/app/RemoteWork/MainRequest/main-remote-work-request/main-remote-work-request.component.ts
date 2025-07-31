import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NgbTabset } from 'src/app/Tap/tab.component';
import { ExcuseComponent } from 'src/app/excuse/excuse.component';
import { MgrExcuseComponent } from 'src/app/excuse/mgr-excuse/mgr-excuse.component';
import { APIRestFulService } from 'src/app/shared/apiRestful.service';
import { AuthService } from 'src/app/shared/auth.service';
import { AppSettings } from 'src/app/shared/global.settings';
import { LodingSpinnerService } from 'src/app/shared/loadingspinner.service';
import { UserTokenInfo } from 'src/app/shared/usertokeninfo';
import { MgrRemoteWorkRequestComponent } from '../../MgrRequest/mgr-remote-work-request/mgr-remote-work-request.component';
import { RemoteWorkRequestComponent } from '../../remote-work-request/remote-work-request.component';

@Component({
  selector: 'app-main-remote-work-request',
  templateUrl: './main-remote-work-request.component.html',
  styleUrls: ['./main-remote-work-request.component.css']
})
export class MainRemoteWorkRequestComponent implements OnInit, AfterViewInit {
    TabChange($event: any) {
    }
    
      constructor(private router: Router, private api: APIRestFulService,
        private authService: AuthService, private spinner: LodingSpinnerService) { }
      UserInfo!: UserTokenInfo |null;
      isManager = false;
    
      @ViewChild(MgrRemoteWorkRequestComponent) mgrRemote!: MgrRemoteWorkRequestComponent;
      @ViewChild(RemoteWorkRequestComponent) myRemote!: RemoteWorkRequestComponent;
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
    
