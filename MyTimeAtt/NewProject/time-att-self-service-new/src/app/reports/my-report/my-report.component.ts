import { UserTokenInfo } from './../../shared/usertokeninfo';
import { ResponseResult } from './../../shared/responseresult';
import { AlertMsgComponent } from './../../Modals/alert.component';
import { AppSettings } from './../../shared/global.settings';
import { NgbTabset } from './../../Tap/tab.component';
import { AuthService } from './../../shared/auth.service';
import { TranslateService } from './../../shared/TranslateService';
import { Router } from '@angular/router';
import { APIRestFulService } from './../../shared/apiRestful.service';
import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { LodingSpinnerService } from '../../shared/loadingspinner.service';
import { Subscription, finalize } from 'rxjs';


@Component({
  selector: 'myattreport',
  templateUrl: './my-report.component.html',
  styleUrls: ['./my-report.component.css']
})
export class MyReportComponent implements OnInit, AfterViewInit {

  constructor(private api: APIRestFulService, private router: Router,
    private authService: AuthService, private translate: TranslateService, private zone: NgZone, private spinner: LodingSpinnerService) { }

  busy!: Subscription;
  message!: string;
  MyAttDetails :any[] =[];//: Users;
  MyAttSummary: any;
  MyTimeForm = { Emp_ID: 0, FromDate: 0, ToDate: 0 };
  transDetails :any = null;
  UserInfo!: UserTokenInfo|null;

  @ViewChild('alert') alert!: AlertMsgComponent;

  ngOnInit() {
    this.UserInfo = this.authService.UserInfo();
  }
  ngAfterViewInit() {
    // let date = new Date(), y = date.getFullYear(), m = date.getMonth(), d = date.getDate()
    // let firstDay = new Date(y, m, 1);
    // let lastDay = new Date(y, m + 1, 0);

    //this.getMyAtt();


  }

  LoadEvent() {
    jQuery("#ddlYear option").remove();
    jQuery("#ddlYear").append('<option value="' + new Date().getFullYear() + '">' + new Date().getFullYear() + '</option>');
    jQuery("#ddlYear").append('<option value="' + (new Date().getFullYear() - 1) + '">' + (new Date().getFullYear() - 1) + '</option>');
    $('#ddlYear option[value="' + new Date().getFullYear() + '"]').attr('selected', 'selected');

    $("#ddlYear").change(x => {
      this.bindMonths();
    });
    this.bindMonths()
  }

  getMyAtt() {
    
    let selectYear = jQuery("#ddlYear option:selected").val()!.toString();
    let selectedMonth = jQuery("#ddlMonth option:selected").val()!.toString();

    let date = new Date(parseInt(selectYear, 10), parseInt(selectedMonth, 10) - 1, 1);
    let fdateF = new Date(date.getFullYear(), date.getMonth(), 1);
    let tdateF = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.MyTimeForm.FromDate = (fdateF).ToOADate();
    this.MyTimeForm.ToDate = (tdateF).ToOADate();

    this.spinner.show();


    this.api.post(AppSettings.WebApiUrl + 'SelfServices/TimeSheet/GetMonthDetails', this.MyTimeForm, true).pipe(
      finalize(() => this.spinner.hide())
  ).subscribe((res: ResponseResult) => {
      console.log(res.Result)
      this.MyAttDetails = res.Result.Details;
      this.MyAttSummary = res.Result.Summary;
    })
  }

  printReport(){
    let selectYear = jQuery("#ddlYear option:selected").val()!.toString();
    let selectedMonth = jQuery("#ddlMonth option:selected").val()!.toString();

    let date = new Date(parseInt(selectYear, 10), parseInt(selectedMonth, 10) - 1, 1);
    let fdateF = new Date(date.getFullYear(), date.getMonth(), 1);
    let tdateF = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.MyTimeForm.FromDate = (fdateF).ToOADate();
    this.MyTimeForm.ToDate = (tdateF).ToOADate();

    this.MyTimeForm.Emp_ID=  this.UserInfo!.UserEmpID!;

    this.OpenFile (AppSettings.ReportApiUrl + 'SelfServices/Monthly/Details/PrintReport', this.MyTimeForm, "Post")
    // this.busy = this.api.post(AppSettings.ReportApiUrl + 'SelfServices/Daily/PrintReport/pdf', this.MyTimeForm, true).subscribe((res: ResponseResult) => {
    //   console.log('111111')
    // })
  }

  bindMonths() {
    jQuery("#ddlMonth option").remove();
    //$('#ddlLetter_Type option[value!="-1"]').remove();
    let xx = [
      { val: "<option value='1'>" + this.translate.getValue('JanMonth') + "</option>" },
      { val: "<option value='2'>" + this.translate.getValue('FebMonth') + "</option>" },
      { val: "<option value='3'>" + this.translate.getValue('MarMonth') + "</option>" },
      { val: "<option value='4'>" + this.translate.getValue('AprMonth') + "</option>" },
      { val: "<option value='5'>" + this.translate.getValue('MayMonth') + "</option>" },
      { val: "<option value='6'>" + this.translate.getValue('JuneMonth') + "</option>" },
      { val: "<option value='7'>" + this.translate.getValue('JulyMonth') + "</option>" },
      { val: "<option value='8'>" + this.translate.getValue('AugustMonth') + "</option>" },
      { val: "<option value='9'>" + this.translate.getValue('SeptemberMonth') + "</option>" },
      { val: "<option value='10'>" + this.translate.getValue('OctoberMonth') + "</option>" },
      { val: "<option value='11'>" + this.translate.getValue('NovemberMonth') + "</option>" },
      { val: "<option value='12'>" + this.translate.getValue('DecemberMonth') + "</option>" }
    ];
    var i = 1;
    var selectedYear = $("#ddlYear option:selected").val();
    if (selectedYear! < new Date().getFullYear().toString())
      var currMonth = 12;
    else
      var currMonth = new Date().getMonth() + 1;
    while (i <= currMonth) {
      jQuery("#ddlMonth").append(xx[i - 1].val);
      i++;
    }

    $('#ddlMonth option[value="' + (new Date().getMonth() + 1) + '"]').attr('selected', 'selected')
  }

  returnRowColor(row: { vac_id: number; vacinfo: string | string[]; TotalLate: string; ActualTime: string; timefin: string; timefout: string; }) {
    if (row.vac_id > 0 && !row.vacinfo.includes('Absence')) //اجازة
     // return '#c2f1b7';
     return 'vacColor'

    if (row.TotalLate != '--:--') //التأخير
      //return '#ffcf9e';
      return 'latColor'

    if ((row.ActualTime != '00:00' && row.timefin == '--:--' && row.timefout == '--:--' )||(row.vacinfo.includes('Absence'))) //الغياب
      //return '#f2dede';
      return 'absColor'

    if (row.timefin != '--:--' && row.timefout == '--:--') //نسيان بصمة
      //return '#fff7c0';
      return 'notcomColor'

    if (row.ActualTime == '00:00') //اجازة رسمية
      //return '#e8e8e8';
      return 'offColor'
return;
  }
  preventDBLClick(e:MouseEvent){

    e.preventDefault();
    return;
  }
  UserSelectiontoviewDailyDetailsEMP(empid: string, mdate: string) {
    this.spinner.show();



     this.api.getRequestAS(AppSettings.WebApiUrl + "SelfServices/TimeSheet/GetTransDetailsForEmployee/" + empid + "/" + mdate).pipe(
      finalize(() => this.spinner.hide())
  ).subscribe((res: { Status: number; Result: null; }) => {
      if (res.Status == 1) {
        this.transDetails = res.Result;
        if (this.transDetails != null) {
          setTimeout( () => {
            this.openForm();
          }, 200);
        }
      }
    });
  }

  openForm() {
    this.message = jQuery("#TransDetailsDialog").html();

    this.alert.refID = 11;
    this.alert.actionName = 'add';
    this.alert.modalTitle = this.translate.getValue('DutyDetails');

    this.alert.modalFooter = true; //show footer
    this.alert.modalMessage = true; //display message
    this.alert.message = this.message;
    // this.accountChartAction.cssModal = 'fade';
    this.alert.okButton = false; //show Ok Button
    this.alert.cancelButton = true; //show cancel Button
    this.alert.okButtonText = this.translate.getValue('btOk');
    this.alert.cancelButtonText = this.translate.getValue('bt_close');
    this.alert.backdropModal = 'static';
    // let componentData = {
    //     component: AccountChartActionComponent,
    //     inputs: {
    //         fromAccountID: fromID,
    //         toAccountID: toID,
    //         toAccountIsType: typeID,
    //         action: action,
    //         accountType: this.accountType,
    //         accountClasses: this.accountClasses,
    //         accountFsItems: this.accountFsItems,
    //         title: ''
    //     }
    //};
    setTimeout( () => {
      this.alert.openDynamic(null, 'lg');//md,sm,lg
    }, 200);
  }

  onDismissAlert() { }

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
