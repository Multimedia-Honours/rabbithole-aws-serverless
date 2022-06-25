import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessErrorPopupComponent } from './success-error-popup.component';

describe('SuccessErrorPopupComponent', () => {
  let component: SuccessErrorPopupComponent;
  let fixture: ComponentFixture<SuccessErrorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessErrorPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessErrorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
