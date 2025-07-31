import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainExcuseComponent } from './main-excuse.component';

describe('MainExcuseComponent', () => {
  let component: MainExcuseComponent;
  let fixture: ComponentFixture<MainExcuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainExcuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainExcuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
