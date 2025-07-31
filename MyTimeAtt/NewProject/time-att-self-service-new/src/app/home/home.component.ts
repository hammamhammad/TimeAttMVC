import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/auth.service";
import { AppSettings } from "../shared/global.settings";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}
  TimePolicyURL: any;
  CompanyPolicyURL: any;
  isALCUser = false;

  ngOnInit() {
    this.authService.getIsAuth().subscribe((res: any) => {
      if (res) {
        //@ts-ignore
        this.TimePolicyURL = AppSettings.getCurrentLanguage == 'ar' ? AppSettings.PublicUserInfo.Result.TimeAttPolicyURLAR : AppSettings.PublicUserInfo.Result.TimeAttPolicyURLEN;
          //@ts-ignore
      this.CompanyPolicyURL = AppSettings.getCurrentLanguage == 'ar' ? AppSettings.PublicUserInfo.Result.PolicyURLAR : AppSettings.PublicUserInfo.Result.PolicyURLEN;
           //@ts-ignore
       this.isALCUser = AppSettings.PublicUserInfo.Result.reg_id == 1322 ? true : false;
      }
    });
  }
}
