import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsTableComponent } from './claims-table.component';

describe('ClaimsTableComponent', () => {
  let component: ClaimsTableComponent;
  let fixture: ComponentFixture<ClaimsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
