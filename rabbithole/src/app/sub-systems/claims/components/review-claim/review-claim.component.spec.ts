import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewClaimComponent } from './review-claim.component';

describe('ReviewClaimComponent', () => {
  let component: ReviewClaimComponent;
  let fixture: ComponentFixture<ReviewClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
