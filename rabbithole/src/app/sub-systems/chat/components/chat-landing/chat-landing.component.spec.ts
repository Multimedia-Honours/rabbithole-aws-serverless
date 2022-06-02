import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLandingComponent } from './chat-landing.component';

describe('ChatLandingComponent', () => {
  let component: ChatLandingComponent;
  let fixture: ComponentFixture<ChatLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
