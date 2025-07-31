import { AppSettings } from './../shared/global.settings';
import { UserTokenInfo } from './../shared/usertokeninfo';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,AfterViewInit {

  ngAfterViewInit(): void {
  setTimeout(() => {
    // $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
    //   $(this).parents('.navbar-collapse').collapse('hide');

  //});
  $(document).click(function (event) {

    var clickover = $(event.target);
    var _opened = $(".navbar-collapse").hasClass("in");
    if (_opened === true && !clickover.hasClass("navbar-toggle")) {
        $("button.navbar-toggle").click();
    }
});
  }, 300);
  }
  constructor(
    private authService: AuthService,private router: Router) { }
  UserInfo: UserTokenInfo;

  ngOnInit() {
   // this.UserInfo = this.authService.UserInfo();
  }
  get UserInfoData():string{
    if (AppSettings.PublicUserInfo)
   return AppSettings.getCurrentLanguage=='ar'? AppSettings.PublicUserInfo.Result.EmployeeName :AppSettings.PublicUserInfo.Result.EmployeeNameEN;
   else
   return "";
  }
  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }
  menuClick(e)
  {
    if (e.target.nodeName ==='A'){
      let ref=  e.target.hash.replace('#/','');
      this.router.navigate([ref]);
    }
    else{
      this.router.navigate(['/']);
    }

    e.preventDefault();
  }
  ChangeLang() {
    if (this.cultureLang == 'ar') {
      jQuery.cookie("_culture", 'en',{domain: AppSettings.CookiDomain, path: '/'});
      //setTimeout(() => {
        window.location.reload();
     // }, 1000);

    }
    else {
      jQuery.cookie("_culture", 'ar',{domain: AppSettings.CookiDomain, path: '/'});
      //setTimeout(() => {
        window.location.reload();
     // }, 1000);
    }
  }
}
