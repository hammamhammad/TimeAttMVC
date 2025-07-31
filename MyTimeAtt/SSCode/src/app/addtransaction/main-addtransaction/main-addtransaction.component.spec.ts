import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAddtransactionComponent } from './main-addtransaction.component';

describe('MainAddtransactionComponent', () => {
  let component: MainAddtransactionComponent;
  let fixture: ComponentFixture<MainAddtransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAddtransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAddtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
