import { AppSettings } from './../../shared/global.settings';
import { APIRestFulService } from './../../shared/apiRestful.service';
import { Component, OnInit, Injector } from '@angular/core';
import { LodingSpinnerService } from '../../shared/loadingspinner.service';
import { Subscription, finalize } from 'rxjs';


@Component({
  selector: 'app-emp-trans-details',
  templateUrl: './emp-trans-details.component.html',
  styleUrls: ['./emp-trans-details.component.css']
})
export class EmpTransDetailsComponent implements OnInit {

  constructor(private api: APIRestFulService, private injector: Injector, private spinner: LodingSpinnerService) {

    this.transParam = injector.get('transParam');


  }

  busy!: Subscription;
  transParam={
  empid:null,
  mdate:null,
  }
  transDetailsDay: any;
  get cultureLang(): string {
    return AppSettings.getCurrentLanguage;
  }
  ngOnInit() {
    this.UserSelectiontoviewDailyDetails(this.transParam.empid, this.transParam.mdate)
  }
  UserSelectiontoviewDailyDetails(empid: string | null, mdate: string | null) {
    this.spinner.show();


   
    this.api.getRequestAS(AppSettings.WebApiUrl + "SelfServices/TimeSheet/GetTransDetailsForManager/" + empid + "/" + mdate).pipe(
      finalize(() => this.spinner.hide())
  ).subscribe((res: { Status: number; Result: any; }) => {
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
