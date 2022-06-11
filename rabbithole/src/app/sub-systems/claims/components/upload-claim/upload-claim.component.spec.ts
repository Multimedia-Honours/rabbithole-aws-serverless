import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadClaimComponent } from './upload-claim.component';

describe('UploadClaimComponent', () => {
  let component: UploadClaimComponent;
  let fixture: ComponentFixture<UploadClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
