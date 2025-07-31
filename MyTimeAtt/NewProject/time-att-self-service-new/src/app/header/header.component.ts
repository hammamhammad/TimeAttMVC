import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../shared/global.settings';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  get HeaderIMG():string{
    if (AppSettings.PublicUserInfo)
   return AppSettings.PublicUserInfo.Result.HeaderIMGURL;
   else
   return "mlogo.gif";
  }
  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }




}
