import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedTableComponent } from './declined-table.component';

describe('DeclinedTableComponent', () => {
  let component: DeclinedTableComponent;
  let fixture: ComponentFixture<DeclinedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclinedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
