import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrReportComponent } from './mgr-report.component';

describe('MgrReportComponent', () => {
  let component: MgrReportComponent;
  let fixture: ComponentFixture<MgrReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgrReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
