import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestScorrersComponent } from './best-scorrers.component';

describe('BestScorrersComponent', () => {
  let component: BestScorrersComponent;
  let fixture: ComponentFixture<BestScorrersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestScorrersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestScorrersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
