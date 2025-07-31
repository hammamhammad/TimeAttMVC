import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { Notifications } from '../shared/notifications';
import { LodingSpinnerService } from '../shared/loadingspinner.service'; // Corrected typo in the service name
import { ResponseResult } from '../shared/responseresult';
import { UserTokenInfo } from '../shared/usertokeninfo';
import { AppSettings } from '../shared/global.settings';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',

})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  hfloginpage!: FormGroup;
  @ViewChild('email') email!: ElementRef;
  busy!: Subscription;
  subscription!: Subscription;
  pleaseWait = false;
  UserInfo!: UserTokenInfo| null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private _notification: Notifications, // Corrected variable name
    private spinner: LodingSpinnerService
  ) {
    console.log("fdsfdsf")
  }

  startIdleTimer() {
    const timer$ = timer(2000, 1000);
    this.subscription = timer$.subscribe(t => this.ProcessCheck());
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
    this.UserInfo = this.authService.UserInfForLogin()!;
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
  signwithDiff(e: { preventDefault: () => void; }) {
    e.preventDefault();
    this.UserInfo = null;
    localStorage.removeItem('userInfo');
  }
  logout() {
    this.authService.logout()
      .subscribe((res:ResponseResult) => {
        if (res.Status) {
             this._notification.showSuccess('Logout', 'you are loged out');
        }
        else {
          this._notification.showError('Logout Error', res.Msg);
        }
      },
      error => {
        this._notification.showError('Logout Error', error);
      });

  }
  login() {
    this.spinner.show();
    this.authService.login(this.hfloginpage.value)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (res: ResponseResult) => {
          console.log("res")
          console.log(res)
          if (res.Status) {
            this.pleaseWait = true;
            AppSettings.resourceBundle = null;
            this.subscription.unsubscribe();
          
            // Reset any needed settings on successful login
            setTimeout(() => this.router.navigate(['/']), 1000);
          } else {
           this._notification.showError('', res.Msg); // Assuming showError is the correct method
          }
        },
        error => {
          this._notification.showError('Login Error', error);
        }
      );
  }
}
