import { AppSettings } from './shared/global.settings';
import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
//import { DOCUMENT } from '@angular/platform-browser';
import { AuthService } from './shared/auth.service';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { LodingSpinnerService } from './shared/loadingspinner.service';
import { NotificationAnimationType, Options } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  title = 'app';
  public isEnglish :boolean = false;
  //template = `<div class="loder"><img src="assets/img/lg.double-ring-spinner.gif" /></div>`;
  template = `  <div class="preloader2">
  <div></div>
</div>`;
  get lodingtext(): string { return (!this.isEnglish ? 'الرجاء الإنتظار...' : 'Please Wait...') };
  private loadingSubscription!: Subscription;
  isLoading = false;

constructor( private loadingSpinnerService: LodingSpinnerService, private authService: AuthService,@Inject(DOCUMENT) private document:any) { //@Inject(DOCUMENT) private document,

  }
  ngOnInit(): void {
    this.authService.getIsAuth().subscribe((res: any) => {
      if (res) {
        let headerIMG = this.document.getElementById('HeaderIMG');
        headerIMG.src = AppSettings.PublicUserInfo!.Result?.HeaderIMGURL;  }
    })
    this.loadingSubscription = this.loadingSpinnerService.loading$.subscribe(
      (status: boolean) => {
        this.isLoading = status;
      }
    );

    let link = this.document.getElementById('css');

    // "assets/css/bootstrap-rtl.min.css",

    let lang = AppSettings.getCurrentLanguage;
    if (lang === 'ar') {
      this.isEnglish = false;
      link.href = 'assets/css/bootstrap-rtl.min.css' ;
     

      // rtlcss.disabled = false;
      let el = document.getElementsByTagName('body')[0];
      let x = el.classList.contains('smart-rtl');
      if (!x) {

        el.classList.add('smart-rtl');

      }
    } else {
      this.isEnglish = true;
      // rtlcss.disabled = true;
      link.href = 'assets/css/bootstrap.min.css' ;
     
      let el = document.getElementsByTagName('body')[0];
      let x = el.classList.contains('smart-rtl');
      if (!!x) {
        el.classList.remove('smart-rtl');
      }

    }
  }
  ngAfterViewInit(): void {
    let yer = (new Date).getFullYear();
    let copyrightElement = document.getElementsByClassName('copyrights')[0];
    // if (this.isEnglish){
    //   copyrightElement.innerHTML ='All rights reserved Tatweer Co. for Educational Services © ' + yer.toString()
    // }
    // else{
    //   copyrightElement.innerHTML ='جميع الحقوق محفوظة لشركة تطوير للخدمات التعليمية © ' + + yer.toString()
    // }
    let element = document.getElementById('preloader');
    if (element) {
      setTimeout(() => {
        element!.style['display'] = 'none';
      }, 1000);
    }
  }

  getOption()  :Options{
    return {
      position: (!this.isEnglish ? ['bottom', 'left'] : ['bottom', 'right']), // ["top" or "bottom", "right" or "left"]
      timeOut: 5000,
      lastOnBottom: true,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      maxLength: 10000,
      preventDuplicates: true,
      preventLastDuplicates: 'visible', // 'all', //visible
      theClass: 'notificationclass',
      rtl: !this.isEnglish,
      animate: (!this.isEnglish ? NotificationAnimationType.FromLeft :NotificationAnimationType.FromRight), // "fromRight" or "fromLeft" or "scale" or "rotate" or null
       maxStack: 8
    }
  }


}
