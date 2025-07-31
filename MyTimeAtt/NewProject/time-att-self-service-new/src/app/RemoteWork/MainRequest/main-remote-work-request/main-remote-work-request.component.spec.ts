import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRemoteWorkRequestComponent } from './main-remote-work-request.component';

describe('MainRemoteWorkRequestComponent', () => {
  let component: MainRemoteWorkRequestComponent;
  let fixture: ComponentFixture<MainRemoteWorkRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainRemoteWorkRequestComponent]
    });
    fixture = TestBed.createComponent(MainRemoteWorkRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
