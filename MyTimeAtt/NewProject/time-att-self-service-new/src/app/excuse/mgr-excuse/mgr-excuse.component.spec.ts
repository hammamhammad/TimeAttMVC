import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrExcuseComponent } from './mgr-excuse.component';

describe('MgrExcuseComponent', () => {
  let component: MgrExcuseComponent;
  let fixture: ComponentFixture<MgrExcuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgrExcuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgrExcuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
