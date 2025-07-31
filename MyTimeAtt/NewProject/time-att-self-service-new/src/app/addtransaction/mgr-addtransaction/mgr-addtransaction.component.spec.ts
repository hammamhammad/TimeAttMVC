import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrAddtransactionComponent } from './mgr-addtransaction.component';

describe('MgrAddtransactionComponent', () => {
  let component: MgrAddtransactionComponent;
  let fixture: ComponentFixture<MgrAddtransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgrAddtransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgrAddtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
