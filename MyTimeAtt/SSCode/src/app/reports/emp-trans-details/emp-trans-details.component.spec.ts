import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTransDetailsComponent } from './emp-trans-details.component';

describe('EmpTransDetailsComponent', () => {
  let component: EmpTransDetailsComponent;
  let fixture: ComponentFixture<EmpTransDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpTransDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpTransDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
