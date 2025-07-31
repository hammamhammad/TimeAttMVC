import { Subscription } from 'rxjs/Subscription';
import { AppSettings } from './../../shared/global.settings';
import { APIRestFulService } from './../../shared/apiRestful.service';
import { Component, OnInit, Injector } from '@angular/core';
import { LodingSpinnerService } from '../../shared/loadingspinner.service';


@Component({
  selector: 'app-emp-trans-details',
  templateUrl: './emp-trans-details.component.html',
  styleUrls: ['./emp-trans-details.component.css']
})
export class EmpTransDetailsComponent implements OnInit {

  constructor(private api: APIRestFulService, private injector: Injector, private spinner: LodingSpinnerService) {

    this.transParam = injector.get('transParam');


  }

  busy: Subscription;
  transParam={
  empid:null,
  mdate:null,
  }
  transDetailsDay;
  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }
  ngOnInit() {
    this.UserSelectiontoviewDailyDetails(this.transParam.empid, this.transParam.mdate)
  }
  UserSelectiontoviewDailyDetails(empid, mdate) {
    this.spinner.show();


   
    this.api.getRequestAS(AppSettings.WebApiUrl + "SelfServices/TimeSheet/GetTransDetailsForManager/" + empid + "/" + mdate).finally(() => {
      this.spinner.hide();
  }).subscribe(res => {
      if (res.Status == 1) {
        this.transDetailsDay = res.Result;
        // if (this.transDetailsDay != null) {
        //   setTimeout(function () {
        //     this.message = jQuery("#MGRTransDetailsDialog").html();
        //     this.openForm();
        //   }.bind(this), 500);
        // }
      }
    });
  }
}
