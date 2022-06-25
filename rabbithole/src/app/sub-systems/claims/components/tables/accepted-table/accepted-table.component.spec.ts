import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedTableComponent } from './accepted-table.component';

describe('AcceptedTableComponent', () => {
  let component: AcceptedTableComponent;
  let fixture: ComponentFixture<AcceptedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
