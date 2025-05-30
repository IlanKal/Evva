import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestUploadComponent } from './guest-upload.component';

describe('GuestUploadComponent', () => {
  let component: GuestUploadComponent;
  let fixture: ComponentFixture<GuestUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
