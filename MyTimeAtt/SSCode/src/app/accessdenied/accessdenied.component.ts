import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../shared/global.settings';
@Component({
  selector: 'accessdenied',
  templateUrl: 'accessdenied.component.html'
})

export class AccessDeniedComponent implements OnInit {
  get IsRTL() {
        return AppSettings.CurrentLang === 'ar' ? true : false;
    }
  ngOnInit() { }
}
