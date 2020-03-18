import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerSuccessComponent } from './add-player-success.component';

describe('AddPlayerSuccessComponent', () => {
  let component: AddPlayerSuccessComponent;
  let fixture: ComponentFixture<AddPlayerSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayerSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
