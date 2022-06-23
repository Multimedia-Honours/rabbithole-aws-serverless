import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsBackgroundComponent } from './claims-background.component';

describe('ClaimsBackgroundComponent', () => {
  let component: ClaimsBackgroundComponent;
  let fixture: ComponentFixture<ClaimsBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
