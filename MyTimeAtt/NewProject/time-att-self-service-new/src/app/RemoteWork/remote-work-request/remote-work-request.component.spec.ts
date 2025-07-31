import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteWorkRequestComponent } from './remote-work-request.component';

describe('RemoteWorkRequestComponent', () => {
  let component: RemoteWorkRequestComponent;
  let fixture: ComponentFixture<RemoteWorkRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoteWorkRequestComponent]
    });
    fixture = TestBed.createComponent(RemoteWorkRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
