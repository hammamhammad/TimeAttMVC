import { APIRestFulService } from './../../shared/apiRestful.service';
import { AppSettings } from './../../shared/global.settings';
import { Component, OnInit, Injector } from '@angular/core';
import { LodingSpinnerService } from '../../shared/loadingspinner.service';
import { Subscription, finalize } from 'rxjs';


@Component({
  selector: 'app-month-trans-view',
  templateUrl: './month-trans-view.component.html',
  styleUrls: ['./month-trans-view.component.css']
})
export class MonthTransViewComponent implements OnInit {

  constructor(private api: APIRestFulService,private injector: Injector, private spinner: LodingSpinnerService) {

    this.mothlyData=injector.get('mothlyData'); 
   }

  busy!: Subscription;
  transDetails :any = null;
  transDetailsDay :any = null;
  
  mothlyData={
    Emp_ID:0,
    FromDate:0,
    ToDate:0
  }
  
  ngOnInit() {
   this.UserSelectiontoviewMS(this.mothlyData.Emp_ID, this.mothlyData.FromDate, this.mothlyData.ToDate);
  }

  

  UserSelectiontoviewMS(emp_id: any, fdateno: any, tdateno: any) {

    this.mothlyData.Emp_ID=emp_id;
    this.mothlyData.FromDate=fdateno;
    this.mothlyData.ToDate=tdateno;

    this.spinner.show();


     this.api.getRequestAS(AppSettings.WebApiUrl + 'SelfServices/TimeSheet/GetTimeSheetMonthlyDetailsForManager/' + emp_id + '/' + fdateno + '/' + tdateno).pipe(
      finalize(() => this.spinner.hide())
  ).subscribe((res: { Status: number; Result: any; }) => {
      if (res.Status == 1) {
        this.transDetails = res.Result;
        if (this.transDetails != null) {
          // setTimeout(function () {
          //   this.message = jQuery("#MonthlyDiv").html();
          //   this.openForm();
          // }.bind(this), 200);
        }
      }
      //console.log(this.reasons);
    })
  }

  printMonthlyReport(){

    this.OpenFile (AppSettings.ReportApiUrl + 'SelfServices/Monthly/Details/PrintReport', this.mothlyData, "Post")
    // this.busy = this.api.post(AppSettings.ReportApiUrl + 'SelfServices/Daily/PrintReport/pdf', this.MyTimeForm, true).subscribe((res: ResponseResult) => {
    //   console.log('111111')
    // })
  }
  OpenFile = function (url: string, data: string | any[] | JQuery<HTMLElement> | JQuery.PlainObject<any> | null, method: string) {
    if (data == null)
        data = {};
    //url and data options required
    if (url && data) {
        //data can be string of parameters or array/object
        data = typeof data == 'string' ? data : jQuery.param(data);
        //split params into form inputs
        var inputs = '';
        jQuery.each(data.split('&'), function () {
            var pair = this.split('=');
            inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
        });
        //send request
        jQuery('<form action="' + url + '" method="' + (method || 'post') + '" target="_blank">' + inputs + '</form>')
            .appendTo('body').submit().remove();
    };
};
}
