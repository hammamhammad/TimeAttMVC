import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthTransViewComponent } from './month-trans-view.component';

describe('MonthTransViewComponent', () => {
  let component: MonthTransViewComponent;
  let fixture: ComponentFixture<MonthTransViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthTransViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthTransViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
