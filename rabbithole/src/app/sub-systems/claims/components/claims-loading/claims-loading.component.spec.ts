import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsLoadingComponent } from './claims-loading.component';

describe('ClaimsLoadingComponent', () => {
  let component: ClaimsLoadingComponent;
  let fixture: ComponentFixture<ClaimsLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
