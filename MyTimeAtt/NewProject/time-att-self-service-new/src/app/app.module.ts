import { LoginComponent } from './login/login.component';
import { DataTablesModule } from './datatable/angular-datatables.module';
import { TranslateModule } from './shared/TranslateModule';
import { NgbTabsetModule } from './Tap/tab.modal';
import { PopupDatepickerModule } from './datepicker/datepicker.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainExcuseComponent } from './excuse/main-excuse/main-excuse.component';
import { AuthGuard } from './shared/authguard';
import { ExcuseComponent } from './excuse/excuse.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MgrExcuseComponent } from './excuse/mgr-excuse/mgr-excuse.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccessDeniedComponent } from './accessdenied/accessdenied.component';
import { StringFormatPipe } from './shared/stringformat.pipe';
import { HeaderComponent } from './header/header.component';
import { ModalModule } from './Modals/modal.module';
import { HomeComponent } from './home/home.component';
import { VacationComponent } from './vacation/vacation.component';
import { ReportsComponent } from './reports/reports.component';
import { MgrReportComponent } from './reports/mgr-report/mgr-report.component';
import { MyReportComponent } from './reports/my-report/my-report.component';
import { MonthTransViewComponent } from './reports/month-trans-view/month-trans-view.component';
import { ViolationComponent } from './reports/violation/violation.component';
import { Select2Module } from './select2/ng2-select2';
import { EmpTransDetailsComponent } from './reports/emp-trans-details/emp-trans-details.component';
import { MytasksComponent } from './mytasks/mytasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { MyrequestsComponent } from './myrequests/myrequests.component';
import { TaskActionComponent } from './task-action/task-action.component';
import { AddtransactionComponent } from './addtransaction/addtransaction.component';
import { MgrAddtransactionComponent } from './addtransaction/mgr-addtransaction/mgr-addtransaction.component';
import { MainAddtransactionComponent } from './addtransaction/main-addtransaction/main-addtransaction.component';
import { TimepickerModule } from './timepicker/timepicker.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CustomFormsModule } from 'ng2-validation';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatInputModule} from '@angular/material/input';
import { RemoteWorkRequestComponent } from './RemoteWork/remote-work-request/remote-work-request.component';
import { MgrRemoteWorkRequestComponent } from './RemoteWork/MgrRequest/mgr-remote-work-request/mgr-remote-work-request.component';
import { MainRemoteWorkRequestComponent } from './RemoteWork/MainRequest/main-remote-work-request/main-remote-work-request.component';



const routes: Routes = [
  {
    path: "",
    component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: "excuce",
    component: MainExcuseComponent, canActivate: [AuthGuard]
  },
  {
    path: "Remote",
    component: MainRemoteWorkRequestComponent, canActivate: [AuthGuard]
  },
  // // {
  // //   path: "mgrexcuce",
  // //   component: MgrExcuseComponent, canActivate: [AuthGuard]
  // // },
  {
    path: "vacation",
    component: VacationComponent//, canActivate: [AuthGuard]
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
  // // {
  // //   path: "vio",
  // //   component: ViolationComponent, canActivate: [AuthGuard]
  // // },
  {
    path: "report",
    component: ReportsComponent//, canActivate: [AuthGuard]
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
    component: LoginComponent
  }

];

@NgModule({
  // entryComponents: [MonthTransViewComponent,
  //   EmpTransDetailsComponent],
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
     MainAddtransactionComponent,
     RemoteWorkRequestComponent,
     MgrRemoteWorkRequestComponent,
     MainRemoteWorkRequestComponent,

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
    NgbNavModule,
    NgbTabsetModule.forRoot(),
    TranslateModule.forRoot(),
    DataTablesModule,
    NgbModule,
    Select2Module,
    //  CustomFormsModule,
     SimpleNotificationsModule.forRoot(),
    // Ng4LoadingSpinnerModule.forRoot()
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    MatInputModule

  ],
  exports: [SimpleNotificationsModule],//[SimpleNotificationsModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: LOCALE_ID,
      useValue: 'en'
    }, 
    //Notifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

