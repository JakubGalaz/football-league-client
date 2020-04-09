import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestAssistantsComponent } from './best-assistants.component';

describe('BestAssistantsComponent', () => {
  let component: BestAssistantsComponent;
  let fixture: ComponentFixture<BestAssistantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestAssistantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestAssistantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
