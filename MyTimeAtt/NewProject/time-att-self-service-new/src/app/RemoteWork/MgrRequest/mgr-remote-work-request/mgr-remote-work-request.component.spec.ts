import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrRemoteWorkRequestComponent } from './mgr-remote-work-request.component';

describe('MgrRemoteWorkRequestComponent', () => {
  let component: MgrRemoteWorkRequestComponent;
  let fixture: ComponentFixture<MgrRemoteWorkRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MgrRemoteWorkRequestComponent]
    });
    fixture = TestBed.createComponent(MgrRemoteWorkRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
