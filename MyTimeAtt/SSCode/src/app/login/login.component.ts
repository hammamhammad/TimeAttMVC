import { Notifications } from './../shared/notifications';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppSettings } from '../shared/global.settings';
import { User, UserTokenInfo } from '../shared/usertokeninfo';
import { ResponseResult } from '../shared/responseresult';
import { LodingSpinnerService } from '../shared/loadingspinner.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',

})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  hfloginpage: FormGroup;
  @ViewChild('email') email;
  busy: Subscription;
  subscription: Subscription;
  pleaseWait = false;
  UserInfo: UserTokenInfo;
  constructor(private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private _notifcation: Notifications, private spinner: LodingSpinnerService) { }
  startIdleTimer() {
    let timer = Observable.timer(2000, 1000);
    this.subscription = timer.subscribe(t => this.ProcessCheck());
  }
  ProcessCheck() {
    let user = this.authService.UserInfo();
    if (user) {
        this.subscription.unsubscribe();
        this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.logout();
    this.UserInfo = this.authService.UserInfForLogin();
    this.hfloginpage = this.fb.group({
      Username: [(this.UserInfo ? this.UserInfo.UserName : ''), Validators.required],
      Password: ['', Validators.required],
      RememberMe: [false],
    });
    
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.busy) {
      this.busy.unsubscribe();
    }
  }
  ngAfterViewInit() {
    // this.email.nativeElement.focus();
    this.startIdleTimer();
  }
  signwithDiff(e) {
    e.preventDefault();
    this.UserInfo = null;
    localStorage.setItem('userInfo', null);
  }
  logout() {
    this.authService.logout()
      .subscribe((res:ResponseResult) => {
        if (res.Status) {
          //   this._notifcation.showSuccess('Logout', 'you are loged out');
        }
        else {
          this._notifcation.showError('Logout Error', res.Msg);
        }
      },
      error => {
        this._notifcation.showError('Logout Error', error);
      });

  }
  login() {

    this.spinner.show();

   
     this.authService.login(this.hfloginpage.value) .finally(() => {
          this.spinner.hide();
      })

      .subscribe((res:ResponseResult) => {
        if (res.Status) {
          this.pleaseWait = true;
          AppSettings.resourceBundle = null;
          this.subscription.unsubscribe();
          setTimeout(function() {
             this.router.navigate(['/']);
          }.bind(this), 1000);
         
          // this._notifcation.showSuccess('Login Succsess', 'You are logged in');
        }
        else {
          this._notifcation.showError('', res.Msg );
        }

      }
      ,
      error => {
        this._notifcation.showError('Login Error', error);
      });
  }
}
