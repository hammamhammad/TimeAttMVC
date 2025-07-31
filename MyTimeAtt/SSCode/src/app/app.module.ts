import { StringFormatPipe } from './shared/stringformat.pipe';
import { AccessDeniedComponent } from './accessdenied/accessdenied.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/authguard';
import { DataTablesModule } from './datatable/angular-datatables.module';
import { TranslateModule } from './shared/TranslateModule';
import { NgbTabsetModule } from './Tap/tab.modal';
import { ModalModule } from './Modals/modal.module';
import { PopupDatepickerModule } from './datepicker/datepicker.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, enableProdMode } from '@angular/core';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { ExcuseComponent } from './excuse/excuse.component';
import { VacationComponent } from './vacation/vacation.component';
import { ReportsComponent } from './reports/reports.component';
import { MytasksComponent } from './mytasks/mytasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { MyrequestsComponent } from './myrequests/myrequests.component';
import { TaskActionComponent } from './task-action/task-action.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from './timepicker/timepicker.module';
import { SharedModule } from './shared/shared.module';
import { APIRestFulService } from './shared/apiRestful.service';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Notifications } from './shared/notifications';
import { AddtransactionComponent } from './addtransaction/addtransaction.component';
import { MyReportComponent } from './reports/my-report/my-report.component';
import { MgrReportComponent } from './reports/mgr-report/mgr-report.component';
import { MonthTransViewComponent } from './reports/month-trans-view/month-trans-view.component';
import { EmpTransDetailsComponent } from './reports/emp-trans-details/emp-trans-details.component';
import { Select2Module } from './select2/ng2-select2';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HeaderComponent } from './header/header.component';
import { ViolationComponent } from './reports/violation/violation.component';
import { MgrExcuseComponent } from './excuse/mgr-excuse/mgr-excuse.component';
import { MainExcuseComponent } from './excuse/main-excuse/main-excuse.component';
import { MgrAddtransactionComponent } from './addtransaction/mgr-addtransaction/mgr-addtransaction.component';
import { MainAddtransactionComponent } from './addtransaction/main-addtransaction/main-addtransaction.component';
const routes: Routes = [
  {
    path: "",
    component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: "excuce",
    component: MainExcuseComponent, canActivate: [AuthGuard]
  },
  // {
  //   path: "mgrexcuce",
  //   component: MgrExcuseComponent, canActivate: [AuthGuard]
  // },
  {
    path: "vacation",
    component: VacationComponent, canActivate: [AuthGuard]
  },
  {
    path: "myrequests/:taskid",
    component: TaskDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: "myrequests",
    component: MyrequestsComponent, canActivate: [AuthGuard]
  },
  {
    path: "mytasks/:taskid/:taskview",
    component: TaskActionComponent, canActivate: [AuthGuard]
  },
  {
    path: "mytasks/:taskid",
    component: TaskActionComponent, canActivate: [AuthGuard]
  },
  {
    path: "mytasks",
    component: MytasksComponent, canActivate: [AuthGuard]
  },
  {
    path: "vio/:taskid",
    component: ViolationComponent, canActivate: [AuthGuard]
  },
  // {
  //   path: "vio",
  //   component: ViolationComponent, canActivate: [AuthGuard]
  // },
  {
    path: "report",
    component: ReportsComponent, canActivate: [AuthGuard]
  },
  {
    path: "fingerprint",
    component: MainAddtransactionComponent, canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "accessdenied",
    component: AccessDeniedComponent
  },
  {
    path: "**",
    component: AccessDeniedComponent
  }

];

@NgModule({
  entryComponents: [MonthTransViewComponent,
    EmpTransDetailsComponent],
  declarations: [
    AppComponent,
    ExcuseComponent,
    VacationComponent,
    ReportsComponent,
    MytasksComponent,
    TaskDetailsComponent,
    MyrequestsComponent,
    TaskActionComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    AddtransactionComponent,
    MyReportComponent,
    MgrReportComponent,
    AccessDeniedComponent,
    StringFormatPipe,
    MonthTransViewComponent,
    EmpTransDetailsComponent,
    HeaderComponent,
    ViolationComponent,
    MgrExcuseComponent,
    MainExcuseComponent,
    MgrAddtransactionComponent,
    MainAddtransactionComponent
  ],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    ReactiveFormsModule,
    PopupDatepickerModule,
    TimepickerModule,
    ModalModule,
    CustomFormsModule,
    NgbTabsetModule.forRoot(),
    TranslateModule.forRoot(),
    DataTablesModule,
    SimpleNotificationsModule.forRoot(),
    Select2Module,
    Ng4LoadingSpinnerModule.forRoot()


  ],
  exports: [SimpleNotificationsModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: LOCALE_ID,
      useValue: 'en'
    }, Notifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

